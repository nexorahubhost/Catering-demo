// === MENU DATA ===
const menuItems = [
    { id: 1, name: "Jollof Rice", category: "main", price: 10, description: "Delicious Nigerian jollof rice" },
    { id: 2, name: "Fried Rice", category: "main", price: 10, description: "Classic fried rice with vegetables" },
    { id: 3, name: "Chicken", category: "protein", price: 5, description: "Grilled or fried chicken" },
    { id: 4, name: "Beef", category: "protein", price: 5, description: "Well seasoned beef" },
    { id: 5, name: "Moimoi", category: "side", price: 3, description: "Steamed bean pudding" },
    { id: 6, name: "Coke", category: "drink", price: 2, description: "Chilled soft drink" }
];

// === STATE ===
let cart = [];
let currentFilter = 'all';

// === INIT ===
document.addEventListener('DOMContentLoaded', () => {
    renderMenu();
    updateCartUI();

    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (navbar) {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });
});

// === MENU ===
function renderMenu() {
    const grid = document.getElementById('menuGrid');
    if (!grid) return;

    grid.innerHTML = '';

    const filtered = currentFilter === 'all'
        ? menuItems
        : menuItems.filter(item => item.category === currentFilter);

    const icons = {
        main: '🍽️',
        protein: '🍗',
        side: '🥗',
        drink: '🥤'
    };

    filtered.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'menu-item';
        card.style.animation = `fadeInUp 0.5s ease ${index * 0.1}s both`;

        card.innerHTML = `
            <div class="menu-item-image">${icons[item.category] || '🍴'}</div>
            <div class="menu-item-content">
                <div class="menu-item-header">
                    <h3>${item.name}</h3>
                    <span class="price">$${item.price}</span>
                </div>
                <p>${item.description}</p>
                <button class="add-to-cart">Add to Order</button>
            </div>
        `;

        card.querySelector('.add-to-cart').addEventListener('click', () => {
            addToCart(item.id);
        });

        grid.appendChild(card);
    });
}

function filterMenu(category) {
    currentFilter = category;

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');

        if (
            btn.textContent.toLowerCase().includes(category) ||
            (category === 'all' && btn.textContent.toLowerCase().includes('all'))
        ) {
            btn.classList.add('active');
        }
    });

    renderMenu();
}

// === CART ===
function addToCart(itemId) {
    const item = menuItems.find(i => i.id === itemId);
    if (!item) return;

    const existing = cart.find(i => i.id === itemId);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }

    updateCartUI();
    showNotification(`${item.name} added to cart`);

    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.style.transform = 'scale(1.2)';
        setTimeout(() => cartIcon.style.transform = 'scale(1)', 200);
    }
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
}

function updateCartUI() {
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');

    if (!cartItems || !cartCount || !cartTotal) return;

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align:center;color:#999;">Cart is empty</p>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div>
                    <h4>${item.name}</h4>
                    <p>$${item.price} x ${item.quantity}</p>
                </div>
                <button onclick="removeFromCart(${item.id})">✕</button>
            </div>
        `).join('');
    }

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

// === WHATSAPP CHECKOUT ===
function checkout() {
    if (cart.length === 0) {
        alert("Cart is empty");
        return;
    }

    let message = "Hello, I want to order:%0A%0A";

    cart.forEach(item => {
        message += `${item.name} x ${item.quantity} - $${item.price * item.quantity}%0A`;
    });

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    message += `%0ATotal: $${total.toFixed(2)}%0A`;
    message += "%0AName:%0APhone:%0AAddress:";

    const phoneNumber = "234XXXXXXXXXX"; // REPLACE THIS

    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");

    cart = [];
    updateCartUI();
}

// === UI HELPERS ===
function toggleCart() {
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('cartOverlay');

    if (sidebar) sidebar.classList.toggle('open');
    if (overlay) overlay.classList.toggle('active');
}

function showNotification(msg) {
    const n = document.createElement('div');
    n.textContent = msg;

    n.style.cssText = `
        position:fixed;
        top:100px;
        right:20px;
        background:#333;
        color:#fff;
        padding:10px 20px;
        border-radius:5px;
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
    }, 2500);
}

function toggleMobileMenu() {
    const nav = document.querySelector('.nav-links');
    if (!nav) return;

    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
}
