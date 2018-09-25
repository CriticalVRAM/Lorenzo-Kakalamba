$(document).ready(function () {
    var scroll = new SmoothScroll('a[href*="#"]')
    AOS.init({
        duration: 1200,
    })

    
    $('.about__slideshow').slick({
        autoplay: true,
        arrows: false
    })

    $('.menu__box').tabslet({
        animation: true,
    })
    $('.gallery__box').tabslet({
        animation: true,
    })


    function clearGallery(cur) {
            document.getElementById(cur).innerHTML = ''
    }
    function createGallery(cur) {
            document.getElementById(cur).innerHTML = 
            `
            <div class="gallery__${cur}">
                <div class="gallery__${cur}-selected">
                    <img src="/img/2-enterijer.jpg" alt="Interior image 1" class="gallery__image">
                    <img src="/img/3-enterijer.jpg" alt="Interior image 2" class="gallery__image">
                    <img src="/img/4-enterijer.jpg" alt="Interior image 3" class="gallery__image">
                    <img src="/img/5-enterijer.jpg" alt="Interior image 4" class="gallery__image">
                    <img src="/img/2-enterijer.jpg" alt="Interior image 1" class="gallery__image">
                </div>
                <div class="gallery__${cur}-view">
                    <img src="/img/2-enterijer.jpg" alt="Interior image 1" class="gallery__image">
                    <img src="/img/3-enterijer.jpg" alt="Interior image 2" class="gallery__image">
                    <img src="/img/4-enterijer.jpg" alt="Interior image 3" class="gallery__image">
                    <img src="/img/5-enterijer.jpg" alt="Interior image 4" class="gallery__image">
                    <img src="/img/2-enterijer.jpg" alt="Interior image 1" class="gallery__image">
                </div>
            </div>
            `
    }
    function showImages(cur) {
            $(`.gallery__${cur}-selected`).slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                fade: true,
                asNavFor: `.gallery__${cur}-view`
            })
            $(`.gallery__${cur}-view`).slick({
                slidesToShow: 4,
                slidesToScroll: 1,
                asNavFor: `.gallery__${cur}-selected`,
                centerMode: true,
                focusOnSelect: true,
                prevArrow: '<a class="gallery__prev"><svg class="gallery__icon"><use xlink:href="/img/sprite.svg#icon-chevron-left"></use></svg></a>',
                nextArrow: '<a class="gallery__next"><svg class="gallery__icon"><use xlink:href="/img/sprite.svg#icon-chevron-right"></use></svg></a>',
            })
    }
    function activateGallery(cur) {
        clearGallery(cur)
        createGallery(cur)
        showImages(cur)
    }
    document.querySelector('.gallery__box').addEventListener('click', event => {
        var posible = ['interior', 'garden', 'events', 'food', 'deserts', 'details']
        if (posible.includes(event.target.innerHTML)) {
            activateGallery(event.target.innerHTML)
        } 
    }, true)
    activateGallery('interior')
})