function openAccountForm() {
    document.getElementById('accountForm').style.display = 'block';
}

function closeAccountForm() {
    document.getElementById('accountForm').style.display = 'none';
}

function login(event) {
    event.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if (email.trim() !== '' && password.trim() !== '') {
        localStorage.setItem('loggedIn', 'true');
        document.getElementById('logoutBtn').style.display = 'block';
        document.getElementById('accountForm').style.display = 'none';
        alert('Anmeldung erfolgreich!');
    } else {
        alert('Bitte geben Sie Ihre Email und Passwort ein.');
    }
}

function logout() {
    localStorage.removeItem('loggedIn');
    document.getElementById('logoutBtn').style.display = 'none';
    alert('Abmeldung erfolgreich!');
}

document.addEventListener('DOMContentLoaded', function() {
    const loggedIn = localStorage.getItem('loggedIn');
    if (loggedIn) {
        document.getElementById('logoutBtn').style.display = 'block';
    }
});

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

    calculateTotalPrice();
}

function calculateTotalPrice() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalPrice = 0;

    cart.forEach(item => {
        totalPrice += parseFloat(item.price.replace(' Fr.', '').replace(',', '.'));
    });

    const totalPriceElement = document.getElementById('total-price');
    totalPriceElement.textContent = `Gesamtpreis: ${totalPrice.toFixed(2)} Fr`;
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



