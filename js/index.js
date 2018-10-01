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
            fade: true,
            asNavFor: `.gallery__${cur}-view`,
            adaptiveHeight: true,
            prevArrow: '<a class="gallery__prev"><svg class="gallery__icon"><use xlink:href="img/sprite.svg#icon-chevron-left"></use></svg></a>',
            nextArrow: '<a class="gallery__next"><svg class="gallery__icon"><use xlink:href="img/sprite.svg#icon-chevron-right"></use></svg></a>',
        })
        $(`.gallery__${cur}-view`).slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            asNavFor: `.gallery__${cur}-selected`,
            centerMode: true,
            focusOnSelect: true,
            arrows: false,
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


    document.querySelector('.gallery__tabs').addEventListener('click', changeTab, true)
    document.querySelector('.menu__tabs').addEventListener('click', changeTab, true)
    function changeTab(event) {
        if (event.target.className === 'gallery__tab' || event.target.className === 'menu__tab') {
            $(`.${event.currentTarget.className} li .activeTabView`).removeClass('activeTabView')
            $(event.target).addClass('activeTabView')
        }
    }
})