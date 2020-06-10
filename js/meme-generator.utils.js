'use strict'
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function drawImgToCanvas(canvas, ctx, img) {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
}

function drawLine(txt, idx, position, size) {
    if (!position) {
        position = {}
        position.x = gElCanvas.width / 4
        if (idx === 0) {
            position.y = 50
        } else if (idx === 1) {
            position.y = gElCanvas.height - 50
        } else {
            position.y = (gElCanvas.height / 2)
        }

    }
    let fontStr = `${size}px IMPACT`
    gCtx.font = fontStr;
    gCtx.fillText(txt, position.x, position.y);
    let linePosition = getPosition(position.x, position.y);
    return linePosition;
}

function getPosition(x, y) {
    let position = { x, y };
    return position;
}

function drawRect(position, width, height, size) {
    gCtx.beginPath();
    gCtx.rect(position.x-10, position.y-size-5, width+20, height);
    gCtx.stroke();
}

function hideElement(el){
    el.hidden = true
}

function showElement(el){
    el.style.display = 'flex'
}