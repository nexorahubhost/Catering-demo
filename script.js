// === MENU DATA ===
const menuItems = [
    { id: 1, name: "Truffle Arancini", category: "appetizer", price: 8, description: "Crispy risotto balls with truffle and mozzarella" },
    { id: 2, name: "Beef Wellington", category: "main", price: 35, description: "Tender beef wrapped in puff pastry with mushroom duxelles" },
    { id: 3, name: "Lemon Tart", category: "dessert", price: 9, description: "Zesty lemon curd in buttery pastry with meringue" },
    { id: 4, name: "Artisan Cheese Board", category: "appetizer", price: 15, description: "Selection of local cheeses with honey and nuts" },
    { id: 5, name: "Herb-Crusted Salmon", category: "main", price: 28, description: "Fresh salmon with dill sauce and seasonal vegetables" },
    { id: 6, name: "Chocolate Fondant", category: "dessert", price: 10, description: "Molten center chocolate cake with vanilla ice cream" },
    { id: 7, name: "Sparkling Lemonade", category: "beverage", price: 5, description: "Fresh lemons with sparkling water and mint" },
    { id: 8, name: "Bruschetta Trio", category: "appetizer", price: 12, description: "Tomato, mushroom, and olive tapenade on toasted ciabatta" }
];

// === STATE MANAGEMENT ===
let cart = [];
let currentFilter = 'all';

// === INITIALIZATION ===
document.addEventListener('DOMContentLoaded', () => {
    renderMenu();
    updateCartUI();
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});

// === MENU FUNCTIONS ===
function renderMenu() {
    const grid = document.getElementById('menuGrid');
    grid.innerHTML = '';
    
    const filtered = currentFilter === 'all' 
        ? menuItems 
        : menuItems.filter(item => item.category === currentFilter);
    
    filtered.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'menu-item';
        card.style.animation = `fadeInUp 0.5s ease ${index * 0.1}s both`;
        
        // Emoji icons based on category
        const icons = {
            appetizer: '🥘',
            main: '🍽️',
            dessert: '🍰',
            beverage: '🥂'
        };
        
        card.innerHTML = `
            <div class="menu-item-image">${icons[item.category] || '🍴'}</div>
            <div class="menu-item-content">
                <div class="menu-item-header">
                    <h3>${item.name}</h3>
                    <span class="price">$${item.price}</span>
                </div>
                <p>${item.description}</p>
                <button class="add-to-cart" onclick="addToCart(${item.id})">Add to Order</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

function filterMenu(category) {
    currentFilter = category;
    
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase().includes(category) || (category === 'all' && btn.textContent.includes('All'))) {
            btn.classList.add('active');
        }
    });
    
    renderMenu();
}

// === CART FUNCTIONS ===
function addToCart(itemId) {
    const item = menuItems.find(i => i.id === itemId);
    const existingItem = cart.find(i => i.id === itemId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    
    updateCartUI();
    showNotification(`${item.name} added to cart!`);
    
    // Animate cart icon
    const cartIcon = document.querySelector('.cart-icon');
    cartIcon.style.transform = 'scale(1.2)';
    setTimeout(() => cartIcon.style.transform = 'scale(1)', 200);
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCartUI();
}

function updateCartUI() {
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');
    
    // Update count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update items
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #999; padding: 2rem;">Your cart is empty</p>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>$${item.price} x ${item.quantity}</p>
                </div>
                <button class="remove-item" onclick="removeFromCart(${item.id})">✕</button>
            </div>
        `).join('');
    }
    
    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

function toggleCart() {
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('cartOverlay');
    sidebar.classList.toggle('open');
    overlay.classList.toggle('active');
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    alert('Proceeding to checkout! Total: ' + document.getElementById('cartTotal').textContent);
}

// === PACKAGE SELECTION ===
function selectPackage(name, price) {
    showNotification(`${name} Package selected! $${price}/person`);
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}

// === FORM HANDLING ===
function handleBooking(e) {
    e.preventDefault();
    showNotification('Booking request submitted successfully! We will contact you soon.');
    e.target.reset();
}

// === UTILITY FUNCTIONS ===
function showNotification(message) {
    // Create notification element
    const notif = document.createElement('div');
    notif.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--secondary-color);
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        border-left: 4px solid var(--primary-color);
    `;
    notif.textContent = message;
    document.body.appendChild(notif);
    
    setTimeout(() => {
        notif.style.opacity = '0';
        notif.style.transform = 'translateX(100%)';
        setTimeout(() => notif.remove(), 300);
    }, 3000);
}

function toggleMobileMenu() {
    // Simple mobile menu toggle - you can expand this
    const nav = document.querySelector('.nav-links');
    if (nav.style.display === 'flex') {
        nav.style.display = 'none';
    } else {
        nav.style.display = 'flex';
        nav.style.flexDirection = 'column';
        nav.style.position = 'absolute';
        nav.style.top = '100%';
        nav.style.left = '0';
        nav.style.right = '0';
        nav.style.background = 'var(--secondary-color)';
        nav.style.padding = '1rem';
    }
                          }
      
