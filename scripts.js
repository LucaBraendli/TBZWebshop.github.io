document.addEventListener('DOMContentLoaded', function() {
    // Load cart items if any
    loadCart();

    // Event listener for clearing the cart
    const clearCartBtn = document.getElementById('clear-cart-btn');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', clearCart);
    }

    // Initialize EmailJS
    emailjs.init("YOUR_USER_ID"); // Replace with your EmailJS user ID

    // Handle newsletter form submission
    const newsletterForm = document.getElementById('newsletterForm');
    newsletterForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const messageElement = document.getElementById('message');

        if (email && validateEmail(email)) {
            saveEmail(email);
            messageElement.textContent = 'Vielen Dank für Ihre Anmeldung!';
            messageElement.style.color = 'green';
            newsletterForm.reset();
        } else {
            messageElement.textContent = 'Bitte geben Sie eine gültige E-Mail-Adresse ein.';
            messageElement.style.color = 'red';
        }
    });

    // Handle sending newsletter emails
    const sendEmailsButton = document.getElementById('sendEmailsButton');
    sendEmailsButton.addEventListener('click', function() {
        const message = document.getElementById('newsletterMessage').value;
        sendEmails(message);
    });
});

// Function to add product to cart
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} wurde zum Warenkorb hinzugefügt!`);
    loadCart();
}

// Function to load cart
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

// Function to clear cart
function clearCart() {
    localStorage.removeItem('cart');
    loadCart();
}

// Function to calculate total price
function holePrice() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalPrice = 0;

    cart.forEach(item => {
        totalPrice += parseFloat(item.price);
    });

    const totalPriceElement = document.getElementById('total-price');
    totalPriceElement.textContent = `Gesamtpreis: ${totalPrice.toFixed(2)} Fr`;
}

// Function to validate email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// Save email to local storage
function saveEmail(email) {
    let emailArray = JSON.parse(localStorage.getItem('emails')) || [];
    emailArray.push(email);
    localStorage.setItem('emails', JSON.stringify(emailArray));
}

// Send emails using EmailJS
function sendEmails(message) {
    const sendMessageElement = document.getElementById('sendMessage');
    const emailArray = JSON.parse(localStorage.getItem('emails')) || [];
    const serviceID = 'service_uadk61d';
    const templateID = 'template_7iyj3te';

    emailArray.forEach(email => {
        const templateParams = {
            to_email: email,
            message: message
        };

        emailjs.send(serviceID, templateID, templateParams)
            .then(function(response) {
                sendMessageElement.textContent = 'Emails erfolgreich gesendet!';
                sendMessageElement.style.color = 'green';
            }, function(error) {
                sendMessageElement.textContent = 'Fehler beim Senden der Emails.';
                sendMessageElement.style.color = 'red';
                console.error('Failed to send emails:', error);
            });
    });
}
