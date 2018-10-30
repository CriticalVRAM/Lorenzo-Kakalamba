var cart = {
    cartItems: [],
    addItem: function(item, price, quantity = 1) {
        this.cartItems.push({
            itemName: item,
            itemPrice: price,
            itemQuantity: quantity
        })
    }
}


var handlers = {
    processEvent: function(event) {
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
    checkItem: function(name) {
        if (cart.cartItems.some(cur => cur.itemName === name)) {
            return true
        } else {
            return false
        }
    },
    calcTotal: function() {
        // check quantity then multyplay by price then add to array and the return reduced array
        var total = []
        cart.cartItems.forEach(cur => {
            let quantity = cur.itemQuantity
            total.push(parseInt(cur.itemPrice) * quantity)
        })
        return total.reduce((acc, cur) => acc + cur, 0)
    }
}


var view = {
    displayCart: function() {
        let cartView = document.querySelector('.cart')
        cartView.innerHTML = ''

        cart.cartItems.forEach(cur => {
            let newItem = document.createElement('li')
            newItem.innerHTML = 
            `
            <p class="cart__text">${cur.itemName}</p>
            <p class="cart__price">${cur.itemPrice}</p>
            <p class="cart__quantity">${cur.itemQuantity}</p>
            <button class="btn btn__remove">-</button>
            `
            cartView.appendChild(newItem)
        })
        document.querySelector('.ordering__total').innerHTML = handlers.calcTotal()
    }
}

document.querySelector('.ordering').addEventListener('click', handlers.processEvent, true)

function test(event) {
    console.log(event.target)
}