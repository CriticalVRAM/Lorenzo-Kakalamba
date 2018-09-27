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
        var galleryTemplate = 
        `
        <div class="gallery__${cur}">
            <div class="gallery__${cur}-selected">
                ${Array(33).join(0).split(0).map((item, i) => `<img src="img/${cur}${i+1}.jpg" alt="${cur} image ${i+1}">`).join('')}
            </div>
            <div class="gallery__${cur}-view">
                ${Array(33).join(0).split(0).map((item, i) => `<img src="img/${cur}${i+1}.jpg" alt="${cur} image ${i+1}">`).join('')}
            </div>
        </div>
        `
        document.getElementById(cur).innerHTML = galleryTemplate
    }

    function showImages(cur) {
        $(`.gallery__${cur}-selected`).slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: `.gallery__${cur}-view`,
            adaptiveHeight: true
        })
        $(`.gallery__${cur}-view`).slick({
            slidesToShow: 5,
            slidesToScroll: 1,
            asNavFor: `.gallery__${cur}-selected`,
            centerMode: true,
            focusOnSelect: true,
            prevArrow: '<a class="gallery__prev"><svg class="gallery__icon"><use xlink:href="img/sprite.svg#icon-chevron-left"></use></svg></a>',
            nextArrow: '<a class="gallery__next"><svg class="gallery__icon"><use xlink:href="img/sprite.svg#icon-chevron-right"></use></svg></a>',
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
    activateGallery('interior')
})