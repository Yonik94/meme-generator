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

// function resizeCanvas(canvas, width, height, bHeight, bWidth) {
//     const imgRatio = width / height
//     const containerRatio = bWidth / bHeight
//     //  {
//     //     if (bHeight < bWidth) {
//     //         if (height > bHeight) {
//     //             height = bHeight

//     //         }
//     //     }
//     // }
//     if (imgRatio < containerRatio) {
//         if (width > height) {
//             if (width < bWidth) {
//                 if (height > bHeight) {
//                     height = bHeight
//                     width = bHeight * imgRatio
//                 } else {
//                     height = height;
//                     width = width
//                 }
//             } else {
//                 if (height > bHeight) {
//                     height = bHeight
//                 } else {
//                     height = height
//                 }
//                 width = bHeight * imgRatio
//             }
//         } else {
//             if (width > bWidth){
//                 width = bWidth
//                 height = width*imgRatio
//             }else if (width < bWidth && height < bHeight){
//                 width = width
//                 height = height
//             }else if (width < bWidth && height > bHeight){

//             }

//         }

//     }
//     width = (ratio > 1) ? Math.min(width, bWidth) : Math
//     height = (ratio < 1) ? Math.min(height, bHeight) :
//         width = width * ratio
// }else {
//     width = width
// }
//     }
// canvas.width = width;
// canvas.height = height;
// }

function getCanvasWidth(iheigth, iWidth){
    let cWidth = (iheigth * 500) / iWidth
    return cWidth
}
function resizeCanvas(canvas, width, height, boundary){
    // let ratio = width / height
    let cWidth = Math.min(width, boundary)
    console.log(cWidth)
    let cHeight = (height*cWidth) / width
    canvas.width = cWidth    
    canvas.height = cHeight    
}