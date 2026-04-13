/**
 * Double Take Catering - Shopping Cart Application
 * Fixed cart functionality with proper state management
 */

(function() {
    'use strict';

    // === CONFIGURATION ===
    const CONFIG = {
        PHONE_NUMBER: '2347050216396',
        STORAGE_KEY: 'doubletake_cart',
        CURRENCY: '₦'
    };

    // === STATE ===
    let cart = [];
    let isCartOpen = false;

    // === INITIALIZATION ===
    document.addEventListener('DOMContentLoaded', function() {
        loadCartFromStorage();
        updateCartUI();
        initEventListeners();
        
        // Set minimum date to today for event date
        const dateInput = document.getElementById('eventDate');
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.setAttribute('min', today);
        }
    });

    // === EVENT LISTENERS ===
    function initEventListeners() {
        // Keyboard support for Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && isCartOpen) {
                closeCart();
            }
        });
        
        // Close cart when clicking overlay
        const overlay = document.getElementById('cartOverlay');
        if (overlay) {
            overlay.addEventListener('click', function(e) {
                if (e.target === overlay) {
                    closeCart();
                }
            });
        }
    }

    // === SANITIZATION ===
    function sanitize(str) {
        if (typeof str !== 'string') return '';
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    // === LOCAL STORAGE ===
    function saveCartToStorage() {
        try {
            localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(cart));
        } catch (e) {
            console.warn('Could not save cart:', e);
        }
    }

    function loadCartFromStorage() {
        try {
            const stored = localStorage.getItem(CONFIG.STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed)) {
                    cart = parsed;
                }
            }
        } catch (e) {
            console.warn('Could not load cart:', e);
            cart = [];
        }
    }

    // === VALIDATION ===
    function validateItem(name, price) {
        if (typeof name !== 'string' || name.trim().length === 0) {
            console.error('Invalid item name');
            return false;
        }
        if (typeof price !== 'number' || price <= 0 || !isFinite(price)) {
            console.error('Invalid item price');
            return false;
        }
        return true;
    }

    // === ADD TO CART ===
    window.addToCart = function(name, price) {
        if (!validateItem(name, price)) return;
        
        const existing = cart.find(item => item.name === name);

        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push({ name: name.trim(), price: price, quantity: 1, id: Date.now() });
        }

        saveCartToStorage();
        updateCartUI();
        showNotification(`${sanitize(name)} added to cart`);
    };

    // === UPDATE CART UI ===
    window.updateCartUI = function() {
        const cartItems = document.getElementById('cartItems');
        const cartCount = document.getElementById('cartCount');
        const cartTotal = document.getElementById('cartTotal');

        if (!cartItems || !cartCount || !cartTotal) {
            console.error('Cart elements not found');
            return;
        }

        let totalItems = 0;
        let totalPrice = 0;

        if (cart.length === 0) {
            cartItems.innerHTML = `
                <div class="empty-cart">
                    <div class="empty-cart-icon">🛒</div>
                    <p>Your cart is empty</p>
                    <p style="font-size: 0.9rem; margin-top: 0.5rem;">Add items from the menu</p>
                </div>
            `;
        } else {
            cartItems.innerHTML = '';
            
            cart.forEach((item, index) => {
                totalItems += item.quantity;
                totalPrice += item.price * item.quantity;

                const itemEl = document.createElement('div');
                itemEl.className = 'cart-item';
                itemEl.innerHTML = `
                    <div class="cart-item-name">${sanitize(item.name)}</div>
                    <div class="cart-item-row">
                        <div class="quantity-controls">
                            <button type="button" class="qty-btn" onclick="changeQty(${index}, -1)" aria-label="Decrease quantity" ${item.quantity <= 1 ? 'disabled' : ''}>−</button>
                            <span class="quantity-display">${item.quantity}</span>
                            <button type="button" class="qty-btn" onclick="changeQty(${index}, 1)" aria-label="Increase quantity">+</button>
                        </div>
                        <span class="cart-item-price">${CONFIG.CURRENCY}${(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                    <button type="button" class="remove-btn" onclick="removeFromCart(${index})">Remove item</button>
                `;
                cartItems.appendChild(itemEl);
            });
        }

        cartCount.textContent = totalItems;
        cartTotal.textContent = totalPrice.toLocaleString();
        
        // Update cart button visibility
        const cartBtn = document.querySelector('.cart-btn');
        if (cartBtn) {
            cartBtn.style.transform = totalItems > 0 ? 'scale(1.05)' : 'scale(1)';
        }
    };

    // === CHANGE QUANTITY ===
    window.changeQty = function(index, delta) {
        if (index < 0 || index >= cart.length) return;
        
        const newQuantity = cart[index].quantity + delta;
        
        // Prevent going below 1 (use remove button instead)
        if (newQuantity < 1) return;
        
        cart[index].quantity = newQuantity;

        saveCartToStorage();
        updateCartUI();
    };

    // === REMOVE ITEM ===
    window.removeFromCart = function(index) {
        if (index < 0 || index >= cart.length) return;
        
        const itemName = cart[index].name;
        cart.splice(index, 1);
        
        saveCartToStorage();
        updateCartUI();
        showNotification(`${sanitize(itemName)} removed`, 'info');
    };

    // === TOGGLE CART ===
    window.toggleCart = function() {
        if (isCartOpen) {
            closeCart();
        } else {
            openCart();
        }
    };

    // === OPEN CART ===
    window.openCart = function() {
        const sidebar = document.getElementById('cartSidebar');
        const overlay = document.getElementById('cartOverlay');
        const body = document.body;

        if (!sidebar || !overlay) return;

        isCartOpen = true;

        sidebar.classList.add('open');
        overlay.classList.add('active');
        sidebar.setAttribute('aria-hidden', 'false');
        body.style.overflow = 'hidden'; // Prevent background scroll
    };

    // === CLOSE CART ===
    window.closeCart = function() {
        const sidebar = document.getElementById('cartSidebar');
        const overlay = document.getElementById('cartOverlay');
        const body = document.body;

        if (!sidebar || !overlay) return;

        isCartOpen = false;

        sidebar.classList.remove('open');
        overlay.classList.remove('active');
        sidebar.setAttribute('aria-hidden', 'true');
        body.style.overflow = ''; // Restore scroll
    };

    // === TOGGLE MOBILE MENU ===
    window.toggleMobileMenu = function() {
        const navLinks = document.getElementById('navLinks');
        if (navLinks) {
            navLinks.classList.toggle('active');
        }
    };

    // === FILTER MENU ===
    window.filterMenu = function(category, btnElement) {
        const items = document.querySelectorAll('.menu-item');
        const buttons = document.querySelectorAll('.menu-filters .cta-button');
        
        // Update active button
        buttons.forEach(btn => btn.classList.remove('active'));
        if (btnElement) {
            btnElement.classList.add('active');
        }

        items.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            if (category === 'all' || itemCategory === category) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    };

    // === SELECT PACKAGE ===
    window.selectPackage = function(name, price) {
        if (!validateItem(name, price)) return;
        
        const existing = cart.find(item => item.name === name);

        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push({ name: name.trim(), price: price, quantity: 1, type: 'package', id: Date.now() });
        }

        saveCartToStorage();
        updateCartUI();
        openCart();
        showNotification(`${sanitize(name)} package added`);
    };

    // === WHATSAPP CHECKOUT ===
    window.checkout = function() {
        if (cart.length === 0) {
            showNotification('Your cart is empty', 'error');
            return;
        }

        let message = "Hello, I want to order:\n\n";
        let total = 0;

        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            message += `${item.name} x ${item.quantity} - ${CONFIG.CURRENCY}${itemTotal.toLocaleString()}\n`;
        });

        message += `\nTotal: ${CONFIG.CURRENCY}${total.toLocaleString()}\n`;
        message += "\nName:\nPhone:\nAddress:";

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${CONFIG.PHONE_NUMBER}?text=${encodedMessage}`;

        window.open(whatsappUrl, "_blank");

        // Clear cart after checkout
        cart = [];
        saveCartToStorage();
        updateCartUI();
        closeCart();
        showNotification('Redirecting to WhatsApp...');
    };

    // === BOOKING FORM ===
    window.handleBooking = function(e) {
        e.preventDefault();

        const nameInput = document.getElementById('fullName');
        const emailInput = document.getElementById('email');
        const eventTypeInput = document.getElementById('eventType');
        const dateInput = document.getElementById('eventDate');
        const guestsInput = document.getElementById('guests');

        if (!nameInput || !emailInput || !eventTypeInput || !dateInput || !guestsInput) {
            showNotification('Form error. Please refresh.', 'error');
            return;
        }

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const eventType = eventTypeInput.value;
        const date = dateInput.value;
        const guests = parseInt(guestsInput.value);

        if (!name || !email || !eventType || !date || !guests) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        if (guests < 1) {
            showNotification('Guests must be at least 1', 'error');
            return;
        }

        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            showNotification('Event date cannot be in the past', 'error');
            return;
        }

        let message = `Hello, I want to book an event:\n\n`;
        message += `Name: ${name}\n`;
        message += `Email: ${email}\n`;
        message += `Event Type: ${eventType}\n`;
        message += `Date: ${date}\n`;
        message += `Guests: ${guests}\n`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${CONFIG.PHONE_NUMBER}?text=${encodedMessage}`;

        window.open(whatsappUrl, "_blank");
        
        e.target.reset();
        showNotification('Booking request sent!');
    };

    // === NOTIFICATION ===
    function showNotification(msg, type = 'success') {
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();

        const n = document.createElement('div');
        n.className = 'notification';
        n.textContent = msg;
        n.setAttribute('role', 'alert');
        n.setAttribute('aria-live', 'polite');

        const colors = {
            success: '#0f172a',
            error: '#dc2626',
            info: '#0369a1'
        };
        
        n.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${colors[type] || colors.success};
            color: #fff;
            padding: 14px 24px;
            border-radius: 10px;
            z-index: 9999;
            opacity: 0;
            transform: translateY(-10px);
            transition: all 0.3s ease;
            max-width: 320px;
            word-wrap: break-word;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            font-weight: 500;
        `;

        document.body.appendChild(n);

        requestAnimationFrame(() => {
            n.style.opacity = '1';
            n.style.transform = 'translateY(0)';
        });

        setTimeout(() => {
            n.style.opacity = '0';
            n.style.transform = 'translateY(-10px)';
            setTimeout(() => n.remove(), 300);
        }, 3000);
    }

})();
