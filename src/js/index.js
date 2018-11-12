require('tabslet')
require('slick-carousel')
require('lightbox2')
import svg4everybody from 'svg4everybody'
import AOS from 'aos'
import SmoothScroll  from "smooth-scroll"

$(window).on('load', function () {
    $(".loader").fadeOut()
})

$(document).ready(function () {
    svg4everybody()
    AOS.init({
        duration: 1000
    });
    new SmoothScroll('.link-ani');

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
            `
            <div class="gallery__${cur}">
                <div class="gallery__${cur}-selected">
                    ${Array(imgNum).join(0).split(0).map((item, i) =>
                        `<img data-lazy="img/${cur}${i + 1}.jpg" alt="${cur} image ${i + 1}">`).join('')}
                    </div>
               <div class="gallery__${cur}-view">
                ${Array(imgNum).join(0).split(0).map((item, i) =>
                `<img data-lazy="img/${cur}${i + 1}.jpg" alt="${cur} image ${i + 1}">`).join('')}
                </div>
            </div>
            `
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
            nextArrow: '<a class="gallery__next"><svg class="gallery__icon"><use href="img/sprite.svg#icon-chevron-right"></use></svg></a>',
            lazyLoad: 'ondemand'
        });
        $('.gallery__' + cur + '-selected').slick('setPosition')

        $('.gallery__' + cur + '-view').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            asNavFor: '.gallery__' + cur + '-selected',
            centerMode: true,
            focusOnSelect: true,
            arrows: false,
            lazyLoad: 'ondemand',
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
    if (document.querySelector('.gallery__box')) {
        document.querySelector('.gallery__box').addEventListener('click', function (event) {
            if (posible.includes(event.target.innerHTML)) {
                activateGallery(event.target.innerHTML);
                window.dispatchEvent(new Event('resize'));
            }
        }, true);
        posible.forEach(cur => activateGallery(cur))
        activateGallery('interior');
    }


    $('.nav').onePageNav({
        currentClass: 'nav__current',
        changeHash: false,
        scrollSpeed: 750,
        filter: ':not(.external)'
    });
});

//////////////////////////////////////////////////////////////////////
// ORDERING
//////////////////////////////////////////////////////////////////////

if (document.querySelector('.ordering')) {
    var cart = {
        cartItems: [],
        addItem: function (item, price, quantity = 1) {
            this.cartItems.push({
                itemName: item,
                itemPrice: price,
                itemQuantity: quantity
            })
        }
    }


    var handlers = {
        processEvent: function (event) {
            let eventParent = event.target.parentNode
            if (event.target.innerHTML == '+') {
                // check if item exists by name
                if (handlers.checkItem(eventParent.children[0].innerHTML)) {
                    // find item by name acces quantity property add quantity
                    var index = cart.cartItems.findIndex(cur => cur.itemName == eventParent.children[0].innerHTML)
                    cart.cartItems[index].itemQuantity++
                    view.displayCart()
                } else {
                    // add new item if no
                    cart.addItem(eventParent.children[0].innerHTML, eventParent.children[1].innerHTML)
                    view.displayCart()
                }
            } else if (event.target.innerHTML == '-') {
                // decrease or clear item
                // find quantity value if 1 remove item if >1 do --
                var item = cart.cartItems.find(cur => cur.itemName == eventParent.children[0].innerHTML)
                if (item.itemQuantity > 1) {
                    item.itemQuantity--
                    view.displayCart()
                } else {
                    var index = cart.cartItems.findIndex(cur => cur.itemName == eventParent.children[0].innerHTML)
                    cart.cartItems.splice(index, 1)
                    view.displayCart()
                }
            }
        },
        checkItem: function (name) {
            if (cart.cartItems.some(cur => cur.itemName === name)) {
                return true
            } else {
                return false
            }
        },
        calcTotal: function () {
            // check quantity then multyplay by price then add to array and the return reduced array
            var total = []
            cart.cartItems.forEach(cur => {
                let quantity = cur.itemQuantity
                total.push(parseInt(cur.itemPrice) * parseInt(quantity))
            })
            total = total.reduce((acc, cur) => acc + cur, 0)
            return `Total: ${total} din`
        }
    }


    var view = {
        displayCart: function () {
            let cartView = document.querySelector('.cart')
            cartView.innerHTML = ''

            cart.cartItems.forEach(cur => {
                let newItem = document.createElement('li')
                newItem.innerHTML =
                    `
            <div class="cart__item">
                <p class="cart__text">${cur.itemName}</p>
                <p class="cart__price">${cur.itemPrice}</p>
                <p class="cart__quantity">Quantity: ${cur.itemQuantity}</p>
                <button class="btn shop__btn shop__btn--remove">-</button>
            </div>
            `
                cartView.appendChild(newItem)
            })
            document.querySelector('.ordering__total').innerHTML = handlers.calcTotal()
        }
    }

    document.querySelector('.ordering').addEventListener('click', handlers.processEvent, true)

    document.querySelector('.ordering__list').addEventListener('click', changeTab, true)

    function changeTab(event) {
        if (event.target.className === '.ordering__list') {
            $('.' + event.currentTarget.className + ' li .activeTabView').removeClass('activeTabView');
            $(event.target).addClass('activeTabView');
        }
    }
}