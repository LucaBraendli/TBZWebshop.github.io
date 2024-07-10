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
document.addEventListener('DOMContentLoaded', (event) => {
    emailjs.init("YOUR_USER_ID"); // Replace with your EmailJS user ID
});

const emailArray = [];

document.getElementById('newsletterForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const messageElement = document.getElementById('message');

    if (email && validateEmail(email)) {
        emailArray.push(email);
        messageElement.textContent = 'Vielen Dank für Ihre Anmeldung!';
        messageElement.style.color = 'green';
        document.getElementById('newsletterForm').reset();

        sendEmails(email);
    } else {
        messageElement.textContent = 'Bitte geben Sie eine gültige E-Mail-Adresse ein.';
        messageElement.style.color = 'red';
    }
});

function sendEmails(newEmail) {
    const messageElement = document.getElementById('message');

    emailArray.forEach(email => {
        const templateParams = {
            to_email: email,
            from_email: newEmail,
            message: 'Dies ist unser neuester Newsletter!'
        };

        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
            .then(function(response) {
                console.log('Emails sent successfully!');
            }, function(error) {
                console.error('Failed to send emails:', error);
            });
    });
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}