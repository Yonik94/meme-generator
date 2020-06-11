'use strict'
var gElCanvas;
var gCtx;
var gIsInEdit;
function onInit() {
    gElCanvas = document.querySelector('canvas');
    gCtx = gElCanvas.getContext('2d');
    renderGallery();
    renderSaved();
    gIsInEdit = false;
}

function renderGallery() {
    let imgs = getImgs();
    let elGallery = document.querySelector('main .gallery .imgs');
    let strHTML = ``;
    imgs.forEach(img => strHTML += `<img onclick="createCanvas(event, '${img.id}')"
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
                    gCtx.strokeStyle = 'black';
                    let width = gCtx.measureText(line.txt).width;
                    let height = line.size + 20;
                    drawRect(line.position, width, height, line.size);
                }
            }
        })
    }
}

function createCanvas(ev, id) {
    if (!gMeme) createMeme(id);
    let meme = getMeme();
    let elCanvasContainer = document.querySelector('.canvas-container')
    let elImg = new Image();
    elImg.src = `./img/${meme.selectedImgId}.jpg`;
    elImg.onload = () => {
        // console.log(elImg.width)
        // console.log(elImg.height)
        console.log(elCanvasContainer.offsetWidth)
        resizeCanvas(gElCanvas, elImg.width, elImg.height, elCanvasContainer.offsetWidth)
    }
    // meme.selectedEl = el;
    gIsInEdit = true;
    draw(meme);
    let el = document.querySelector('.gallery');
    hideElement(el);
    el = document.querySelector('.second-container');
    showElement(el);
    ev.stopPropagation()
}

function editTxtLine() {
    let meme = getMeme();
    let text = document.querySelector('input').value;
    text = text.substring(0, text.length);
    changeMemeTxt(meme.selectedLineId, text);
    draw(meme, meme.selectedEl);
}

function onAddline(ev) {
    startEdit();
    addLine();
    let meme = getMeme();
    let line = meme.textLines;
    updateSelectedLine(line.length - 1);
    draw(meme, meme.selectedEl);
    ev.stopPropagation();
}

function onInputClick(ev, el) {
    startEdit();
    let meme = getMeme();
    el.value = meme.textLines[meme.selectedLineId].txt;
    ev.stopPropagation();
}

function onPrevLine(ev) {
    startEdit();
    let meme = getMeme();
    selectPrevLine();
    draw(meme, meme.selectedEl);
    ev.stopPropagation();
}

function onNextLine(ev) {
    startEdit();
    let meme = getMeme();
    selectNextLine();
    draw(meme, meme.selectedEl);
    ev.stopPropagation();
}

function onLineUp(ev) {
    startEdit();
    let meme = getMeme();
    //update model
    lineUp();
    //update DOM
    draw(meme, meme.selectedEl);
    ev.stopPropagation();
}

function onLineDown(ev) {
    startEdit();
    let meme = getMeme();
    //update model
    lineDown();
    //update DOM
    draw(meme, meme.selectedEl);
    ev.stopPropagation();
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
}

function onIncreaseFont(ev) {
    gIsInEdit = true;
    increaseFont();
    let meme = getMeme();
    draw(meme);
    ev.stopPropagation();
}
function onDecreaseFont(ev) {
    gIsInEdit = true;
    decreasFont();
    let meme = getMeme();
    draw(meme);
    ev.stopPropagation();
}

function onColor(ev, type) {
    gIsInEdit = true;
    let elInputColor = document.querySelector(`input[name="${type}-color"]`);
    elInputColor.click();
    let meme = getMeme();
    draw(meme);
    ev.stopPropagation();
}

function onColorChange(ev, color, type) {
    updateColor(color, type);
    let meme = getMeme();
    draw(meme);
    ev.stopPropagation();
}

function onSaveClick() {
    let confirmation = confirm(`Are you sure you want to save your meme?
    you can edit it every time`);
    if (!confirmation) return;
    let dataURL = gElCanvas.toDataURL('meme.png');
    saveMeme(dataURL);
    renderSaved();
}

function renderSaved() {
    const MEMES = loadFromStorage('memes');
    if (!MEMES) return;
    const SAVED_GALLERY = document.querySelector('.saved-gallery');
    let strHtml = ``;
    MEMES.forEach(meme => {
        strHtml += `<img onclick="onSavedMeme(event, ${meme.id})" src="${meme.link}" alt="">`;
    })
    SAVED_GALLERY.innerHTML = strHtml;
}

function onSavedMeme(ev, idx) {
    const MEMES = loadFromStorage('memes');
    const MEME = findMeme(idx, MEMES);
    setGMeme(MEME.meme);
    const ID = MEME.meme.selectedImgId;
    createCanvas(ev, ID);
    ev.stopPropagation()
}

function onDownloadClick(ev){
    const elButton = document.querySelector('.download')
    let link = document.createElement('a')
    let dataURL = gElCanvas.toDataURL('meme.png');
    link.download = "my-meme.png";
    link.href = dataURL;
    link.click()
    ev.stopPropagation()
}

