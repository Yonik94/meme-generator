'use strict'
var gIdx = 1;
var gKewords = [{ 'baby': 0 }, { 'monsters': 0 }];
var gImages = createImages();
var gMeme;


function createMeme(id) {
    gMeme = {
        selectedEl: '',
        selectedImgId: +id,
        selectedLineId: 0,
        textLines: [
            { txt: 'Enter your text', size: 10, align: 'center', color: 'black', position: ''}
        ]
    }
}

function updateSelectedLine(id) {
    gMeme.selectedLineId = id
}

function addLine() {
    let line = { txt: 'Enter your text', size: 10, align: 'center', color: 'black' }
    gMeme.textLines.push(line)
}
function changeMemeTxt(lineId, value) {
    let line = gMeme.textLines[lineId]
    line.txt = value
}

function getMeme() {
    let meme = gMeme;
    return meme
}

function createImg(keywords) {
    let img = {
        url: `../img/${[gIdx]}.jpg`,
        keywords,
        id: gIdx++
    }
    return img;
}

function createImages() {
    let keywords = [['trump', 'united-states', 'prime-minister'],
    ['obama', 'united-states', 'prime-minister']]
    console.log(keywords)
    let images = keywords.map(keyword => createImg(keyword))
    return images
}

function getImgs() {
    let imgs = gImages
    return imgs
}

function selectPrevLine(){
    if (gMeme.selectedLineId === 0){
        console.log(gMeme.selectedLineId)
        gMeme.selectedLineId = gMeme.textLines.length-1
    }else{
        gMeme.selectedLineId--
    }
    console.log(gMeme.selectedLineId)
}

function selectNextLine(){
    if (gMeme.selectedLineId === gMeme.textLines.length-1){
        gMeme.selectedLineId = 0
    }else{
        gMeme.selectedLineId++
    }
}

function lineUp(){
    let line = gMeme.textLines[gMeme.selectedLineId]
    if (line.position.y > 470) return
    line.position.y += 30
}

function lineDown(){
    let line = gMeme.textLines[gMeme.selectedLineId]
    if (line.position.y < 30) return;
    line.position.y -= 30
}