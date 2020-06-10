'use strict'
var gElCanvas;
var gCtx;
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
        let position = drawLine(txt.txt, idx, txt.position);
        txt.position = position;
    })
}
function createCanvas(el, id) {
    createMeme(id);
    let meme = getMeme();
    meme.selectedEl = el;
    draw(meme, meme.selectedEl);
}
function editTxtLine(ev) {
    let meme = getMeme();
    let text = document.querySelector('input').value;
    text = text.substring(0, text.length);
    changeMemeTxt(meme.selectedLineId, text);
    draw(meme, meme.selectedEl);
}
function onAddline() {
    addLine();
    let meme = getMeme();
    let line = meme.textLines;
    var position = drawLine(line[line.length-1].txt, line.length-1);
    line[line.length-1].position = position;
    updateSelectedLine(line.length-1);
}

function onInputClick(el){
    let meme = getMeme();
    el.value = meme.textLines[meme.selectedLineId].txt;
}

function onPrevLine(){
    selectPrevLine();
}

function onNextLine(){
    selectNextLine();
}

function onLineUp(){
    let meme = getMeme();
    //update model
    lineUp()
    //update DOM
    draw(meme, meme.selectedEl);

}

function onLineDown(){
    let meme = getMeme();
    //update model
    lineDown()
    //update DOM
    draw(meme, meme.selectedEl);
}