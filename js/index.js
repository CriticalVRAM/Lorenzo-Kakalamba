$(document).ready(function () {
    var scroll = new SmoothScroll('a[href*="#"]')

    AOS.init({
        duration: 1200,
    })


    $(document).ready(function () {
        $('.about__slideshow').slick({
            autoplay: true,
            arrows: false
        })
    })

    $('.gallery__interior-selected').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.gallery__interior-view'
    })
    $('.gallery__interior-view').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        asNavFor: '.gallery__interior-selected',
        centerMode: true,
        focusOnSelect: true,
        prevArrow: '<a class="gallery__prev"><svg class="gallery__icon"><use xlink:href="/img/sprite.svg#icon-chevron-left"></use></svg></a>',
        nextArrow: '<a class="gallery__next"><svg class="gallery__icon"><use xlink:href="/img/sprite.svg#icon-chevron-right"></use></svg></a>',
    })


    $('.menu__box').tabslet({
        animation: true,
    })
    $('.gallery__box').tabslet({
        animation: true,
    })
})