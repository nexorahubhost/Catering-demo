/**
 * Double Take Catering - Shopping Cart Application
 * Features: XSS protection, localStorage persistence, keyboard navigation
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

    // === INITIALIZATION ===
    document.addEventListener('DOMContentLoaded', function() {
        loadCartFromStorage();
        updateCartUI();
        
        // Set minimum date to today for event date
        const dateInput = document.getElementById('eventDate');
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.setAttribute('min', today);
        }
        
        // Keyboard support for Escape key to close cart
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                const sidebar = document.getElementById('cartSidebar');
                if (sidebar && sidebar.classList.contains('open')) {
                    toggleCart();
                }
            }
        });
    });

    // === SANITIZATION (XSS Protection) ===
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
            console.warn('Could not save cart to localStorage:', e);
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
            console.warn('Could not load cart from localStorage:', e);
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
            cart.push({ name: name.trim(), price: price, quantity: 1 });
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

        // Error handling for missing elements
        if (!cartItems || !cartCount || !cartTotal) {
            console.error('Cart UI elements not found');
            return;
        }

        let totalItems = 0;
        let totalPrice = 0;

        if (cart.length === 0) {
            cartItems.innerHTML = `<p class="empty-cart">Your cart is empty</p>`;
        } else {
            const fragment = document.createDocumentFragment();
            
            cart.forEach((item, index) => {
                totalItems += item.quantity;
                totalPrice += item.price * item.quantity;

                const itemDiv = document.createElement('div');
                itemDiv.className = 'cart-item';
                itemDiv.innerHTML = `
                    <strong>${sanitize(item.name)}</strong>
                    <div class="cart-item-controls">
                        <div>
                            <button type="button" class="qty-btn" onclick="changeQty(${index}, -1)" aria-label="Decrease quantity">-</button>
                            <span style="margin:0 8px;">${item.quantity}</span>
                            <button type="button" class="qty-btn" onclick="changeQty(${index}, 1)" aria-label="Increase quantity">+</button>
                            <button type="button" class="remove-btn" onclick="removeFromCart(${index})" aria-label="Remove item">Remove</button>
                        </div>
                        <span>${CONFIG.CURRENCY}${(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                `;
                fragment.appendChild(itemDiv);
            });
            
            cartItems.innerHTML = '';
            cartItems.appendChild(fragment);
        }

        cartCount.textContent = totalItems;
        cartTotal.textContent = totalPrice.toLocaleString();
    };

    // === CHANGE QUANTITY ===
    window.changeQty = function(index, delta) {
        if (index < 0 || index >= cart.length) return;
        
        cart[index].quantity += delta;

        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }

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
        showNotification(`${sanitize(itemName)} removed from cart`);
    };

    // === TOGGLE CART ===
    window.toggleCart = function() {
        const sidebar = document.getElementById('cartSidebar');
        const overlay = document.getElementById('cartOverlay');

        if (!sidebar || !overlay) return;

        sidebar.classList.toggle('open');
        overlay.classList.toggle('active');
        
        // Update ARIA attributes for accessibility
        const isOpen = sidebar.classList.contains('open');
        sidebar.setAttribute('aria-hidden', !isOpen);
        
        // Focus management
        if (isOpen) {
            sidebar.focus();
        }
    };

    // === TOGGLE MOBILE MENU ===
    window.toggleMobileMenu = function() {
        const navLinks = document.getElementById('navLinks');
        if (navLinks) {
            navLinks.classList.toggle('active');
        }
    };

    // === FILTER MENU ===
    window.filterMenu = function(category) {
        const items = document.querySelectorAll('.menu-item');
        
        // Update active button state
        const buttons = document.querySelectorAll('.menu-filters button');
        buttons.forEach(btn => {
            btn.style.background = '';
            btn.style.color = '';
        });
        
        if (event && event.target) {
            event.target.style.background = 'var(--accent-color)';
            event.target.style.color = 'white';
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
            cart.push({ name: name.trim(), price: price, quantity: 1, type: 'package' });
        }

        saveCartToStorage();
        updateCartUI();
        toggleCart();
        showNotification(`${sanitize(name)} package added to cart`);
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

        cart = [];
        saveCartToStorage();
        updateCartUI();
        toggleCart();
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
            showNotification('Form error. Please refresh the page.', 'error');
            return;
        }

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const eventType = eventTypeInput.value;
        const date = dateInput.value;
        const guests = guestsInput.value;

        // Validation
        if (!name || !email || !eventType || !date || !guests) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        if (guests < 1) {
            showNotification('Number of guests must be at least 1', 'error');
            return;
        }

        // Validate event date is not in the past
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
        
        // Reset form
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

        const bgColor = type === 'error' ? '#dc2626' : '#0f172a';
        
        n.style.cssText = `
            position: fixed;
            top: 90px;
            right: 20px;
            background: ${bgColor};
            color: #fff;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 9999;
            opacity: 0;
            transform: translateY(-10px);
            transition: all 0.3s ease;
            max-width: 300px;
            word-wrap: break-word;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
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
