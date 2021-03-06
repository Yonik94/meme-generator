'use strict'
var gElCanvas;
var gCtx;
var gIsInEdit;
var gIsInMove = false
function onInit() {
    const elBody = document.querySelector('body')
    console.log(elBody)
    if (elBody.width > 870) {
        document.querySelector('.main-nav').classList.remove('hide')

    }
    gElCanvas = document.querySelector('canvas');
    gCtx = gElCanvas.getContext('2d');
    renderGallery();
    renderSaved();
    gIsInEdit = false;
}

function renderGallery(images) {
    let imgs = getImgs(images);
    let elGallery = document.querySelector('main .gallery .imgs');
    let strHTML = ``;
    imgs.forEach(img => strHTML += `<img onclick="createCanvas('${img.id}')"
    data-id="img-${img.id}" src="${img.url}" alt="meme-img-${img.id}">`);
    elGallery.innerHTML = strHTML;
}

function draw(meme) {
    let elImg = new Image();
    elImg.src = `./img/${meme.selectedImgId}.jpg`;
    elImg.onload = () => {
        drawImgToCanvas(gElCanvas, gCtx, elImg);
        // gCtx.drawImage(elImg, 100, 100, 250, 250);
        let lines = meme.textLines;
        lines.forEach((line, idx) => {
            let position = drawLine(line, idx);
            line.position = position;
            if (gIsInEdit) {
                if (idx === meme.selectedLineId) {
                    //To create spec function for this
                    gCtx.strokeStyle = 'black';
                    let width = gCtx.measureText(line.txt).width;
                    line.textWidth = width;
                    let height = line.size + 15;
                    drawRect(line.position, width, height, line.size);
                    gCtx.textAlign = 'right'
                    gCtx.font = '20px IMPACT'
                    gCtx.strokeText(`✗`, line.position.x, line.position.y - line.size);
                    gCtx.fillText('✗', line.position.x, line.position.y - line.size);
                    gCtx.textAlign = 'left'
                }
            }
        })
    }
}

function onCanvasMousedown(ev) {
    const POS_X = ev.offsetX;
    const POS_Y = ev.offsetY;
    const MEME = getMeme()
    const LINE = findLineByPos(POS_X, POS_Y)
    if (LINE) {
        const SELECTED_LINE = MEME.textLines[gMeme.selectedLineId]
        if (POS_X <= SELECTED_LINE.position.x && POS_X >= SELECTED_LINE.position.x - 20
            && POS_Y <= SELECTED_LINE.position.y - SELECTED_LINE.size
            && POS_Y >= SELECTED_LINE.position.y - SELECTED_LINE.size - 20) {
            removeLine()
            const MEME = getMeme()
            draw(MEME)
        } else {
            gIsInMove = true;
            updateSelectedLine(LINE.id);
            savePosClick(POS_X, POS_Y)
            draw(MEME)
            gIsInEdit = true;
        }
    }
}

function onCanvasMouseMove(ev) {
    if (!gIsInMove) return;
    const POS_X = ev.offsetX;
    const POS_Y = ev.offsetY;
    updateLinePos(POS_X, POS_Y)
    gIsInEdit = true;
    const MEME = getMeme()
    draw(MEME)
}

function onCanvasMouseUp() {
    gIsInMove = false;
    gIsInEdit = true;
    const MEME = getMeme()
    draw(MEME);
}

function createCanvas(id) {
    gElCanvas.addEventListener("mousedown", function () { onCanvasMousedown(event) })
    gElCanvas.addEventListener("mousemove", function () { onCanvasMouseMove(event) })
    gElCanvas.addEventListener("mouseup", onCanvasMouseUp)
    if (!gMeme) createMeme(id);
    let meme = getMeme();
    let elCanvasContainer = document.querySelector('.canvas-container')
    let elImg = new Image();
    elImg.src = `./img/${meme.selectedImgId}.jpg`;
    elImg.onload = () => {
        resizeCanvas(gElCanvas, elImg.width, elImg.height, elCanvasContainer.offsetWidth)
    }
    gIsInEdit = true;
    draw(meme);
    let el = document.querySelector('.gallery');
    hideElement(el);
    el = document.querySelector('.second-container');
    showElement(el);
}

function editTxtLine() {
    let meme = getMeme();
    let text = document.querySelector('.side-nav input').value;
    text = text.substring(0, text.length);
    changeMemeTxt(meme.selectedLineId, text);
    draw(meme, meme.selectedEl);
}

function onAddline() {
    startEdit();
    addLine();
    let meme = getMeme();
    let line = meme.textLines;
    updateSelectedLine(line.length - 1);
    draw(meme, meme.selectedEl);
}

function onInputClick(el) {
    startEdit();
    let meme = getMeme();
    el.value = meme.textLines[meme.selectedLineId].txt;
}

function onPrevLine() {
    startEdit();
    let meme = getMeme();
    selectPrevLine();
    draw(meme, meme.selectedEl);
}

function onNextLine(ev) {
    startEdit();
    let meme = getMeme();
    selectNextLine();
    draw(meme, meme.selectedEl);
}

function onLineUp(ev) {
    startEdit();
    let meme = getMeme();
    //update model
    lineUp();
    //update DOM
    draw(meme, meme.selectedEl);
}

function onLineDown() {
    startEdit();
    let meme = getMeme();
    //update model
    lineDown();
    //update DOM
    draw(meme, meme.selectedEl);
}

function closeEdit() {
    let meme = getMeme();
    if (!meme) return
    gIsInEdit = false;
    draw(meme);
}

function startEdit() {
    gIsInEdit = true;
    let meme = getMeme();
    draw(meme);
    const EL_INPUT = document.querySelector('input')
    EL_INPUT.focus()
}

function onIncreaseFont() {
    gIsInEdit = true;
    increaseFont();
    let meme = getMeme();
    draw(meme);
}
function onDecreaseFont() {
    gIsInEdit = true;
    decreasFont();
    let meme = getMeme();
    draw(meme);
}

function onColor(type) {
    gIsInEdit = true;
    let elInputColor = document.querySelector(`input[name="${type}-color"]`);
    elInputColor.click();
    let meme = getMeme();
    draw(meme);
}

function onColorChange(color, type) {
    updateColor(color, type);
    let meme = getMeme();
    draw(meme);
}

function onSaveClick() {
    gIsInEdit = false;
    const MEME = getMeme();
    draw(MEME);
    setTimeout(function () {
        let dataURL = gElCanvas.toDataURL('meme.png');
        saveMeme(dataURL);
        const EL_SEC_CONTAINER = document.querySelector('.second-container')
        const EL_SAVED = document.querySelector('.saved-memes')
        hideElement(EL_SEC_CONTAINER);
        showElement(EL_SAVED);
        renderSaved();
    }, 400);
}

function renderSaved() {
    const MEMES = loadFromStorage('memes');
    if (!MEMES) return;
    const SAVED_GALLERY = document.querySelector('.saved-gallery');
    let strHtml = ``;
    MEMES.forEach(meme => {
        strHtml += `<div>
        <img onclick="onSavedMeme(${meme.id})" src="${meme.link}" alt="">
        <button onclick="onSavedMeme(${meme.id})">Edit</button>
        <button onclick="onDownloadClick('${meme.link}')">Download</button>
        </div>`;
    })
    SAVED_GALLERY.innerHTML = strHtml;
}

function onSavedMeme(idx) {
    if (gIsInEdit) {
        const confirmation = getConfirm()
        if (!confirmation) return
    }
    const MEMES = loadFromStorage('memes');
    const MEME = findMeme(idx, MEMES);
    setGMeme(MEME.meme);
    const EL_SAVED = document.querySelector('.saved-memes')
    const ID = MEME.meme.selectedImgId;
    createCanvas(ID);
    hideElement(EL_SAVED)
}

function onDownloadClick(url) {
    if (!url){
        gIsInEdit = false;
        const meme = getMeme()
        draw(meme)
        setTimeout(function () {
            let link = document.createElement('a')
            let dataURL = gElCanvas.toDataURL();
            link.download = 'meme';
            link.href = dataURL;
            link.click()
        }, 400)
    }else{
        let link = document.createElement('a')
            link.download = 'meme';
            link.href = url;
            link.click()
    }
}

function onMainNavigator(el) {
    const EL_GALLERY = document.querySelector('.gallery')
    const EL_SEC_CONTAINER = document.querySelector('.second-container')
    const EL_SAVED = document.querySelector('.saved-memes')
    if (gIsInEdit) {
        const confirmation = getConfirm()
        if (!confirmation) return
    }
    if (el === 'gallery') {
        hideElement(EL_SAVED);
        hideElement(EL_SEC_CONTAINER);
        showElement(EL_GALLERY);
    } else {
        hideElement(EL_GALLERY);
        hideElement(EL_SEC_CONTAINER);
        showElement(EL_SAVED);
    }
    const elBody = document.querySelector('body')
    elBody.classList.remove('menu-open')
    gIsInEdit = false;
}

function getConfirm() {
    const CONFIRMATION = confirm(`Are you sure you want to continue?
        All of your changes won\'t be save`)
    return CONFIRMATION
}
function onSearch(value) {
    var imgs = searchOnKeywords(value)
    renderGallery(imgs)
}

function onDeleteClick() {
    removeLine()
    const MEME = getMeme()
    draw(MEME)
}

function onOpenMenue() {
    const elListNavigator = document.querySelector('.main-nav')
    const elBody = document.querySelector('body')
    elBody.classList.add('menu-open')
    elListNavigator.classList.remove('hide')
}

function onScreenClick() {
    const elListNavigator = document.querySelector('.main-nav')
    const elBody = document.querySelector('body')
    elBody.classList.remove('menu-open')
    elListNavigator.classList.add()
}