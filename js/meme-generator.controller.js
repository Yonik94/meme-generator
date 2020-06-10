'use strict'
var gElCanvas;
var gCtx;
var gIsInEdit = true;
function onInit() {
    gElCanvas = document.querySelector('canvas');
    gCtx = gElCanvas.getContext('2d');
    renderGallery();
}

function renderGallery() {
    let imgs = getImgs();
    let elGallery = document.querySelector('main .gallery .imgs');
    let strHTML = ``;
    imgs.forEach(img => strHTML += `<img onclick="createCanvas(this, '${img.id}')"
    data-id="img-${img.id}" src="${img.url}" alt="meme-img-${img.id}">`);
    elGallery.innerHTML = strHTML;
}

function draw(meme, img) {
    drawImgToCanvas(gElCanvas, gCtx, img);
    let txts = meme.textLines;
    txts.forEach((txt, idx) => {
        let position = drawLine(txt.txt, idx, txt.position, txt.size);
        txt.position = position;
        if (gIsInEdit) {
            if (idx === meme.selectedLineId) {
                let width = gCtx.measureText(txt).width
                let height = txt.size + 20
                drawRect(txt.position, width, height, txt.size)
            }
        }
    })
}

function createCanvas(el, id) {
    createMeme(id);
    let meme = getMeme();
    meme.selectedEl = el;
    draw(meme, meme.selectedEl);
    el = document.querySelector('.gallery')
    hideElement(el)
    el = document.querySelector('.second-container')
    showElement(el)
}

function editTxtLine() {
    let meme = getMeme();
    let text = document.querySelector('input').value;
    text = text.substring(0, text.length);
    changeMemeTxt(meme.selectedLineId, text);
    draw(meme, meme.selectedEl);
}

function onAddline(ev) {
    startEdit()
    addLine();
    let meme = getMeme();
    let line = meme.textLines;
    var position = drawLine(line[line.length - 1].txt, line.length - 1);
    line[line.length - 1].position = position;
    updateSelectedLine(line.length - 1);
    draw(meme, meme.selectedEl)
    ev.stopPropagation()

}

function onInputClick(ev, el) {
    startEdit()
    console.log(gIsInEdit)
    let meme = getMeme();
    el.value = meme.textLines[meme.selectedLineId].txt;
    ev.stopPropagation()
}

function onPrevLine(ev) {
    startEdit()
    let meme = getMeme();
    selectPrevLine();
    draw(meme, meme.selectedEl)
    ev.stopPropagation()
}

function onNextLine(ev) {
    startEdit()
    let meme = getMeme();
    selectNextLine();
    draw(meme, meme.selectedEl)
    ev.stopPropagation()
}

function onLineUp(ev) {
    startEdit()
    let meme = getMeme();
    //update model
    lineUp()
    //update DOM
    draw(meme, meme.selectedEl);
    ev.stopPropagation()
}

function onLineDown(ev) {
    startEdit()
    let meme = getMeme();
    //update model
    lineDown()
    //update DOM
    draw(meme, meme.selectedEl);
    ev.stopPropagation()
}

function closeEdit() {
    let meme = getMeme();
    gIsInEdit = false;
    draw(meme, meme.selectedEl)
}

function startEdit() {
    gIsInEdit = true;
    let meme = getMeme();
    draw(meme, meme.selectedEl)
}

function onIncreaseFont(ev){
    gIsInEdit = true;
    increaseFont()
    let meme = getMeme();
    draw(meme, meme.selectedEl)
    ev.stopPropagation()
}
function onDecreaseFont(ev){
    gIsInEdit = true;
    decreasFont()
    let meme = getMeme();
    draw(meme, meme.selectedEl)
    ev.stopPropagation()
}