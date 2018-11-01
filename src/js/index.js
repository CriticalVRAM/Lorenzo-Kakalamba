'use strict';

$(window).on('load', function () {
    $(".loader").fadeOut()
})

svg4everybody()
$(document).ready(function () {
    new SmoothScroll('.link-ani');
    AOS.init({ duration: 1000 });

    $('.about__slideshow').slick({
        autoplay: true,
        arrows: false,
        autoplaySpeed: 2000
    });

    function clearGallery(cur) {
        document.getElementById(cur).innerHTML = '';
    }
    function createGallery(cur) {
        // How many images in each section?
        var imgNum;
        switch (cur) {
            case 'interior':
                imgNum = 33;
                break;
            case 'garden':
                imgNum = 16;
                break;
            case 'events':
                imgNum = 77;
                break;
            case 'food':
                imgNum = 41;
                break;
            case 'deserts':
                imgNum = 14;
                break;
            case 'details':
                imgNum = 28;
                break;
        }

        var galleryTemplate = 
        '\n                 <div class="gallery__' + cur + '">\n                     <div class="gallery__' + cur + '-selected">\n                        ' + Array(imgNum).join(0).split(0).map(function (item, i) {
            return '<img src="img/' + cur + (i + 1) + '.jpg" alt="' + cur + ' image ' + (i + 1) + '">';
        }).join('') + '\n                    </div>\n               <div class="gallery__' + cur + '-view">\n                ' + Array(imgNum).join(0).split(0).map(function (item, i) {
            return '<img src="img/' + cur + (i + 1) + '.jpg" alt="' + cur + ' image ' + (i + 1) + '">';
        }).join('') + '\n            </div>\n        </div>\n        ';
        //     `
        //          <div class="gallery__${cur}">
        //              <div class="gallery__${cur}-selected">
        //                 ${Array(imgNum).join(0).split(0).map((item, i) =>
        //         `<img src="img/${cur}${i + 1}.jpg" alt="${cur} image ${i + 1}">`).join('')}
        //             </div>
        //        <div class="gallery__${cur}-view">
        //         ${Array(imgNum).join(0).split(0).map((item, i) =>
        //         `<img src="img/${cur}${i + 1}.jpg" alt="${cur} image ${i + 1}">`).join('')}
        //     </div>
        // </div>
        // `
        document.getElementById(cur).innerHTML = galleryTemplate;
    }
    function showImages(cur) {
        $('.gallery__' + cur + '-selected').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            fade: true,
            asNavFor: '.gallery__' + cur + '-view',
            adaptiveHeight: true,
            prevArrow: '<a class="gallery__prev"><svg class="gallery__icon"><use href="img/sprite.svg#icon-chevron-left"></use></svg></a>',
            nextArrow: '<a class="gallery__next"><svg class="gallery__icon"><use href="img/sprite.svg#icon-chevron-right"></use></svg></a>'
        });
        $('.gallery__' + cur + '-selected').slick('setPosition')

        $('.gallery__' + cur + '-view').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            asNavFor: '.gallery__' + cur + '-selected',
            centerMode: true,
            focusOnSelect: true,
            arrows: false,
            responsive: [{
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }]
        });
    }
    function activateGallery(cur) {
        clearGallery(cur);
        createGallery(cur);
        showImages(cur);
        window.dispatchEvent(new Event('resize'));
    }

    //Event listener set up
    var posible = ['interior', 'garden', 'events', 'food', 'deserts', 'details'];
    document.querySelector('.gallery__box').addEventListener('click', function (event) {
        if (posible.includes(event.target.innerHTML)) {
            activateGallery(event.target.innerHTML);
        }
    }, true);
    posible.forEach(cur => activateGallery(cur))
    activateGallery('interior');


    $('.nav').onePageNav({
        currentClass: 'nav__current',
        changeHash: false,
        scrollSpeed: 750,
        filter: ':not(.external)'
    });
});