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