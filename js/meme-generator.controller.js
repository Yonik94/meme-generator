'use strict'
function onInit(){
    renderGallery()
}
function renderGallery(){
    let imgs = getImgs()
    let elGallery = document.querySelector('main .gallery .imgs')
    let strHTML = ``
    imgs.forEach(img => strHTML += `<img src="${img.url}" alt="meme-img-${img.id}">`)
    elGallery.innerHTML = strHTML
}