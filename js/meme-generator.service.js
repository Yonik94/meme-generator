'use strict'
var gIdx = 1;
var gKewords = [{'baby': 0}, {'monsters': 0 }];
var gImages = createImages();
console.log(gImages);
function createImg(keywords){
    let img = {
        url: `../img/${[gIdx]}.jpg`,
        keywords,
        id: gIdx++
    }
    return img;
}
function createImages(){
    let keywords = [['trump', 'united-states', 'prime-minister'],
    ['obama', 'united-states', 'prime-minister']]
    console.log(keywords)
    let images = keywords.map( keyword => createImg(keyword))
    return images
}
function getImgs(){
    let imgs = gImages
    return imgs
}