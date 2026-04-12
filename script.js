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

    if (!cartItems || !cartCount || !cartTotal) return;

    let totalItems = 0;
    let totalPrice = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = `<p style="text-align:center;color:#777;">Cart is empty</p>`;
    } else {
        cartItems.innerHTML = cart.map((item, index) => {
            totalItems += item.quantity;
            totalPrice += item.price * item.quantity;

            return `
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
                    <div>
                        <strong>${item.name}</strong><br>
                        ₦${item.price} x ${item.quantity}
                    </div>
                    <button onclick="removeFromCart(${index})" style="background:red;color:white;border:none;padding:4px 8px;border-radius:4px;cursor:pointer;">✕</button>
                </div>
            `;
        }).join('');
    }

    cartCount.textContent = totalItems;
    cartTotal.textContent = totalPrice;
}

// === REMOVE ITEM ===
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

// === TOGGLE CART ===
function toggleCart() {
    const cart = document.getElementById('cartSidebar');
    if (cart) {
        cart.classList.toggle('open');
    }
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

    const phoneNumber = "234XXXXXXXXXX"; // CHANGE THIS

    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");

    cart = [];
    updateCartUI();
}

// === BOOKING FORM ===
function handleBooking(e) {
    e.preventDefault();
    alert("Booking submitted! We’ll contact you shortly.");
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
