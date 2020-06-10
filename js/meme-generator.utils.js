'use strict'
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function drawImgToCanvas(canvas, ctx, img) {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
}

function drawLine(txt, idx, position) {
    if(!position){
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
    gCtx.font = "30px IMPACT";
    gCtx.fillText(txt, position.x, position.y);
    let linePosition = getPosition(position.x, position.y)
    return linePosition
}

function getPosition(x, y){
    let position = {x, y}
    return position
}