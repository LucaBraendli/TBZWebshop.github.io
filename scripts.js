function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} wurde zum Warenkorb hinzugefügt!`);
    loadCart();
}

function loadCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cart-container');
    cartContainer.innerHTML = '';

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';

        const imgElement = document.createElement('img');
        imgElement.src = item.img;
        imgElement.alt = item.name;
        cartItem.appendChild(imgElement);

        const nameElement = document.createElement('p');
        nameElement.textContent = item.name;
        cartItem.appendChild(nameElement);

        const priceElement = document.createElement('p');
        priceElement.textContent = item.price;
        cartItem.appendChild(priceElement);

        cartContainer.appendChild(cartItem);
    });

    holePrice();
}

function clearCart() {
    localStorage.removeItem('cart');
    loadCart();
}

document.addEventListener('DOMContentLoaded', function() {
    loadCart();
    const clearCartBtn = document.getElementById('clear-cart-btn');
    clearCartBtn.addEventListener('click', clearCart);
});

function holePrice() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalPrice = 0;

    cart.forEach(item => {
        totalPrice += parseFloat(item.price);
    });

    const totalPriceElement = document.getElementById('total-price');
    totalPriceElement.textContent = `Gesamtpreis: ${totalPrice.toFixed(2)} Fr`;
}
