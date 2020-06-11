'use strict'
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function drawImgToCanvas(canvas, ctx, img) {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}

function drawLine(line, idx) {
    if (!line.position) {
        line.position = {};
        line.position.x = gElCanvas.width / 4;
        if (idx === 0) {
            line.position.y = 50;
        } else if (idx === 1) {
            line.position.y = gElCanvas.height - 50;
        } else {
            line.position.y = (gElCanvas.height / 2);
        }

    }
    let fontStr = `${line.size}px IMPACT`;
    gCtx.font = fontStr;
    gCtx.fillStyle = line.color;
    gCtx.strokeStyle = line.strokeColor;
    gCtx.lineWidth = 3;
    gCtx.strokeText(line.txt, line.position.x, line.position.y);
    gCtx.fillText(line.txt, line.position.x, line.position.y);
    let linePosition = getPosition(line.position.x, line.position.y);
    return linePosition;
}

function getPosition(x, y) {
    let position = { x, y };
    return position;
}

function drawRect(position, width, height, size) {
    gCtx.beginPath();
    gCtx.rect(position.x - 10, position.y - size - 5, width + 20, height);
    gCtx.stroke();
}

function hideElement(el) {
    el.hidden = true;
}

function showElement(el) {
    el.classList.remove('hide');
}