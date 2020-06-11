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
        textLines: [{
            txt: 'Enter your text', size: 30,
            align: 'center',
            color: 'white',
            strokeColor: 'black',
            position: null
        }]
    };
}

function updateSelectedLine(id) {
    gMeme.selectedLineId = id;
}

function addLine() {
    gIsInEdit = true;
    let line = {
        txt: 'Enter your text', size: 30, align: 'center', color: 'white',
        strokeColor: 'black', position: null
    };
    gMeme.textLines.push(line);
}
function changeMemeTxt(lineId, value) {
    let line = gMeme.textLines[lineId];
    line.txt = value;
}

function getMeme() {
    let meme = gMeme;
    return meme;
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
    const KEYWORDS = [['trump', 'united-states', 'prime-minister'], ['dogs','cute'],
    ['baby', 'dogs', 'cute'], ['cute', 'cat'], ['baby', 'funny', 'cute'],
    ['funny', 'famous'], ['baby', 'cute', 'funny'], ['funny'],
    ['baby', 'funny', 'cute'], ['obama', 'united-states', 'prime-minister'],
    ['basket-ball', 'funny','sports'], ['famous'], ['famous', 'cheers'], ['action'],
    ['famous', 'movie'], ['funny', 'movie'], ['prime-monoster', 'putin', 'russian'],
    ['movie', 'funny']];
    let images = KEYWORDS.map(keyword => createImg(keyword));
    return images;
}

function getImgs() {
    let imgs = gImages;
    return imgs;
}

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
    console.log(memes);
    const MEME = memes.find(meme => meme.id === id);
    return MEME;
}

function setGMeme(meme) {
    gMeme = meme;
}