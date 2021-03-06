'use strict'
var gIdx = 1;
var gKewords = [{ 'baby': 0 }, { 'monsters': 0 }];
var gImages = createImages();
var gMeme;


function createMeme(id) {
    gMeme = {
        selectedImgId: +id,
        selectedLineId: 0,
        clickPos: {x: null, y: null},
        textLines: [{
            txt: 'Enter your text',
            size: 30,
            // align: 'center',
            color: 'white',
            strokeColor: 'black',
            position: null,
            id: 0,
            textWidth: null
        }]
    };
}

function updateSelectedLine(id) {
    gMeme.selectedLineId = id;
}

function addLine() {
    //TO create function in controller:
    gIsInEdit = true;
    let line = {
        txt: 'Enter your text', size: gElCanvas.width / 15, align: 'center', color: 'white',
        strokeColor: 'black', position: null, id: gMeme.textLines.length,
        textWidth: null
    };
    gMeme.textLines.push(line);
}

function changeMemeTxt(lineId, value) {
    let line = gMeme.textLines[lineId];
    line.txt = value;
}

function getMeme() {
    return gMeme;
}

function createImg(keywords) {
    let img = {
        url: `img/${[gIdx]}.jpg`,
        keywords,
        id: gIdx++
    };
    return img;
}

function createImages() {
    const KEYWORDS = [['trump', 'united-states', 'prime-minister'], ['dogs', 'cute'],
    ['baby', 'dogs', 'cute'], ['cute', 'cat'], ['baby', 'funny', 'cute'],
    ['funny', 'famous'], ['baby', 'cute', 'funny'], ['funny'],
    ['baby', 'funny', 'cute'], ['obama', 'united-states', 'prime-minister'],
    ['basket-ball', 'funny', 'sports'], ['famous'], ['famous', 'cheers'], ['action'],
    ['famous', 'movie'], ['funny', 'movie'], ['prime-monoster', 'putin', 'russian'],
    ['movie', 'funny']];
    let images = KEYWORDS.map(keyword => createImg(keyword));
    return images;
}

function getImgs(images = gImages) {
    return images;
}

//TODO: make two functions to one
function selectPrevLine() {
    if (gMeme.selectedLineId === 0) {
        gMeme.selectedLineId = gMeme.textLines.length - 1;
    } else {
        gMeme.selectedLineId--;
    }
}

function selectNextLine() {
    if (gMeme.selectedLineId === gMeme.textLines.length - 1) {
        gMeme.selectedLineId = 0;
    } else {
        gMeme.selectedLineId++;
    }
}
//TODO: make two functions to one
function lineDown() {
    let line = gMeme.textLines[gMeme.selectedLineId];
    if (line.position.y > 470) return;
    line.position.y += 30;
}

function lineUp() {
    let line = gMeme.textLines[gMeme.selectedLineId];
    if (line.position.y < 30) return;
    line.position.y -= 30;
}
//TODO: make two functions to one
function increaseFont() {
    gMeme.textLines[gMeme.selectedLineId].size += 1;
}
function decreasFont() {
    gMeme.textLines[gMeme.selectedLineId].size -= 1;
}

function updateColor(color, type) {
    if (type === 'fill') {
        gMeme.textLines[gMeme.selectedLineId].color = color;
    }
    else gMeme.textLines[gMeme.selectedLineId].strokeColor = color;
}
//const into function shouldn't be in uppercase
function findLineByPos(x, y) {
    const line = gMeme.textLines.find(currLine => {
        return (x >= currLine.position.x -11 && x <= (currLine.position.x + currLine.textWidth + 11)
            && y >= (currLine.position.y - 10 - currLine.size) && y <= currLine.position.y + 15)
    })
    return line;
}
//use filter
function searchOnKeywords(value){
    let findImages = []
    for (let i = 0; i < gImages.length; i++){
        for (let j = 0; j < gImages[i].keywords.length; j++){
            if (gImages[i].keywords[j].includes(value)){
                findImages.push(gImages[i])
                break;
            }
        }
    }
    return findImages;
}

function removeLine(){
    gMeme.textLines.splice([gMeme.selectedLineId], 1)
    gMeme.selectedLineId--
}
//to check if need both
function savePosClick(x, y){
    gMeme.clickPos.x = x - gMeme.textLines[gMeme.selectedLineId].position.x
    gMeme.clickPos.y = y - gMeme.textLines[gMeme.selectedLineId].position.y
}

function updateLinePos(x, y){
    let pos = gMeme.textLines[gMeme.selectedLineId].position
    pos.x = x - gMeme.clickPos.x
    pos.y = y - gMeme.clickPos.y
}

//Saved memes:
function saveMeme(link) {
    let memes = loadFromStorage('memes');
    if (!memes) {
        memes = [];
    }
    let meme = {
        link,
        meme: gMeme,
        id: memes.length
    };
    memes.push(meme);
    saveToStorage('memes', memes);
}

function findMeme(id, memes) {
    const MEME = memes.find(meme => meme.id === id);
    return MEME;
}

function setGMeme(meme) {
    gMeme = meme;
}