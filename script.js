// === STATE ===
let cart = [];

// === ADD TO CART ===
function addToCart(name, price) {
    const existing = cart.find(item => item.name === name);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }

    updateCartUI();
    showNotification(`${name} added`);
}

// === UPDATE CART UI ===
function updateCartUI() {
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');

    let totalItems = 0;
    let totalPrice = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = `<p style="text-align:center;color:#777;">Cart is empty</p>`;
    } else {
        cartItems.innerHTML = cart.map((item, index) => {
            totalItems += item.quantity;
            totalPrice += item.price * item.quantity;

            return `
                <div style="margin-bottom:15px;">
                    <strong>${item.name}</strong>
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-top:5px;">
                        
                        <div>
                            <button onclick="changeQty(${index}, -1)">-</button>
                            <span style="margin:0 8px;">${item.quantity}</span>
                            <button onclick="changeQty(${index}, 1)">+</button>
                        </div>

                        <span>₦${item.price * item.quantity}</span>
                    </div>
                </div>
            `;
        }).join('');
    }

    cartCount.textContent = totalItems;
    cartTotal.textContent = totalPrice;
}

// === CHANGE QUANTITY ===
function changeQty(index, delta) {
    cart[index].quantity += delta;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    updateCartUI();
}


// === REMOVE ITEM ===
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

// === TOGGLE CART ===
function toggleCart() {
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('cartOverlay');

    sidebar.classList.toggle('open');
    overlay.classList.toggle('active');
}

// === FILTER MENU ===
function filterMenu(category) {
    const items = document.querySelectorAll('.menu-item');

    items.forEach(item => {
        const itemCategory = item.getAttribute('data-category');

        if (category === 'all' || itemCategory === category) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

// === SELECT PACKAGE ===

function selectPackage(name, price) {
    const existing = cart.find(item => item.name === name);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ name: name + " Package", price, quantity: 1 });
    }

    updateCartUI();
    toggleCart();
    showNotification(`${name} package added`);
}

// === WHATSAPP CHECKOUT ===
function checkout() {
    if (cart.length === 0) {
        alert("Cart is empty");
        return;
    }

    let message = "Hello, I want to order:%0A%0A";

    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        message += `${item.name} x ${item.quantity} - ₦${itemTotal}%0A`;
    });

    message += `%0ATotal: ₦${total}%0A`;
    message += "%0AName:%0APhone:%0AAddress:";

    const phoneNumber = "2347050216396"; // CHANGE THIS

    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");

    cart = [];
    updateCartUI();
}

// === BOOKING FORM ===
function handleBooking(e) {
    e.preventDefault();

    const inputs = document.querySelectorAll('.contact-form input');
    const name = inputs[0].value;
    const email = inputs[1].value;
    const date = inputs[2].value;
    const guests = inputs[3].value;

    let message = `Hello, I want to book an event:%0A%0A`;
    message += `Name: ${name}%0A`;
    message += `Email: ${email}%0A`;
    message += `Date: ${date}%0A`;
    message += `Guests: ${guests}%0A`;

    const phoneNumber = "2347050216396";

    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
}


// === NOTIFICATION ===
function showNotification(msg) {
    const n = document.createElement('div');
    n.textContent = msg;

    n.style.cssText = `
        position:fixed;
        top:90px;
        right:20px;
        background:#0f172a;
        color:#fff;
        padding:10px 15px;
        border-radius:6px;
        z-index:9999;
        opacity:0;
        transform:translateY(-10px);
        transition: all 0.3s ease;
    `;

    document.body.appendChild(n);

    setTimeout(() => {
        n.style.opacity = '1';
        n.style.transform = 'translateY(0)';
    }, 50);

    setTimeout(() => {
        n.style.opacity = '0';
        n.style.transform = 'translateY(-10px)';
        setTimeout(() => n.remove(), 300);
    }, 2000);
}
