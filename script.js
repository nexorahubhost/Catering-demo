/* === CUSTOMIZABLE COLOR VARIABLES === */
:root {
    --primary-color: #c89b3c;
    --secondary-color: #0f172a;
    --accent-color: #e11d48;
    --text-light: #f8fafc;
    --text-dark: #0f172a;
    --bg-light: #f1f5f9;
    --bg-white: #ffffff;
    --transition: all 0.3s ease;
    
    /* Z-index scale */
    --z-nav: 100;
    --z-overlay: 200;
    --z-sidebar: 300;
    --z-modal: 400;
    --z-notification: 500;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

@media (prefers-reduced-motion: reduce) {
    * {
        transition: none !important;
        animation: none !important;
    }
}

html {
    scroll-behavior: smooth;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: var(--text-dark);
    background: var(--bg-light);
    overflow-x: hidden;
}

/* === NAVIGATION === */
nav {
    background: var(--secondary-color);
    padding: 1rem 5%;
    position: fixed;
    width: 100%;
    top: 0;
    z-index: var(--z-nav);
}

.nav-container {
    max-width: 1200px;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    font-size: 1.6rem;
    font-weight: bold;
    color: var(--primary-color);
    text-decoration: none;
}

.nav-links {
    display: flex;
    list-style: none;
    gap: 2rem;
}

.nav-links a {
    color: var(--text-light);
    text-decoration: none;
    transition: var(--transition);
    padding: 0.5rem;
    position: relative;
}

.nav-links a:hover,
.nav-links a:focus {
    color: var(--primary-color);
}

.nav-links a::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--primary-color);
    transition: width 0.3s ease;
}

.nav-links a:hover::after,
.nav-links a:focus::after {
    width: 100%;
}

/* Mobile menu toggle */
.mobile-menu-toggle {
    display: none;
    background: none;
    border: none;
    color: var(--text-light);
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0.5rem;
    transition: var(--transition);
}

.mobile-menu-toggle:hover {
    color: var(--primary-color);
}

/* === NAV CART BUTTON === */
.cart-btn {
    cursor: pointer;
    color: white;
    font-size: 16px;
    background: var(--primary-color);
    padding: 8px 16px;
    border-radius: 25px;
    border: none;
    transition: var(--transition);
    display: flex;
    align-items: center;
    gap: 6px;
    font-weight: 600;
}

.cart-btn:hover,
.cart-btn:focus {
    background: var(--accent-color);
    transform: scale(1.05);
}

#cartCount {
    background: white;
    color: var(--secondary-color);
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 14px;
    font-weight: bold;
    min-width: 24px;
    text-align: center;
}

/* === HERO === */
.hero {
    height: 100vh;
    background: linear-gradient(rgba(15,23,42,0.8), rgba(15,23,42,0.9)),
                url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092');
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: var(--text-light);
    margin-top: 0;
    padding: 0 1rem;
}

.hero-content {
    max-width: 800px;
}

.hero-content h1 {
    font-size: 3.5rem;
    margin-bottom: 1rem;
    font-weight: 700;
    line-height: 1.2;
}

.hero-content p {
    margin-bottom: 2rem;
    font-size: 1.2rem;
    opacity: 0.9;
}

/* === BUTTON === */
.cta-button {
    padding: 0.9rem 2rem;
    background: var(--primary-color);
    color: var(--secondary-color);
    border-radius: 30px;
    border: none;
    cursor: pointer;
    font-weight: bold;
    transition: var(--transition);
    text-decoration: none;
    display: inline-block;
    text-align: center;
    font-size: 1rem;
}

.cta-button:hover,
.cta-button:focus {
    background: var(--accent-color);
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(225, 29, 72, 0.3);
}

.cta-button.active {
    background: var(--accent-color);
    color: white;
}

/* === SECTIONS === */
section {
    padding: 5rem 5%;
    max-width: 1200px;
    margin: auto;
}

.section-title {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 3rem;
    color: var(--secondary-color);
}

/* === MENU === */
.menu-filters {
    display: flex;
    gap: 0.75rem;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 2.5rem;
}

.menu-filters .cta-button {
    padding: 0.6rem 1.5rem;
    font-size: 0.95rem;
}

.menu-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
}

.menu-item {
    background: white;
    padding: 1.5rem;
    border-radius: 16px;
    transition: var(--transition);
    box-shadow: 0 4px 15px rgba(0,0,0,0.08);
    display: flex;
    flex-direction: column;
    gap: 12px;
    border: 1px solid transparent;
}

.menu-item:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 30px rgba(0,0,0,0.15);
    border-color: var(--primary-color);
}

.menu-item h3 {
    font-size: 1.3rem;
    color: var(--secondary-color);
}

.menu-item p {
    color: #64748b;
    font-size: 0.95rem;
    flex-grow: 1;
}

.price {
    color: var(--accent-color);
    font-weight: bold;
    font-size: 1.3rem;
}

.menu-item .cta-button {
    width: 100%;
    margin-top: auto;
}

/* === PACKAGES === */
.packages {
    background: var(--bg-light);
}

.packages-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2.5rem;
}

.package-card {
    background: white;
    padding: 2.5rem 2rem;
    border-radius: 20px;
    text-align: center;
    transition: var(--transition);
    box-shadow: 0 4px 15px rgba(0,0,0,0.08);
    position: relative;
}

.package-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 30px rgba(0,0,0,0.15);
}

.package-card.featured {
    border: 3px solid var(--primary-color);
    transform: scale(1.02);
    position: relative;
    padding-top: 3.5rem;
}

.package-card.featured:hover {
    transform: scale(1.02) translateY(-8px);
}

.popular-badge {
    position: absolute;
    top: 15px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--primary-color);
    color: var(--secondary-color);
    padding: 6px 20px;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: bold;
    letter-spacing: 1px;
    text-transform: uppercase;
}

.package-card h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    color: var(--secondary-color);
}

.package-price {
    font-size: 1.8rem;
    color: var(--accent-color);
    font-weight: bold;
    margin-bottom: 1.5rem;
}

.package-price span {
    font-size: 1rem;
    color: #64748b;
    font-weight: normal;
}

.package-features {
    list-style: none;
    margin: 1.5rem 0 2rem;
    text-align: left;
}

.package-features li {
    padding: 0.75rem 0;
    border-bottom: 1px solid #e2e8f0;
    color: #475569;
}

.package-features li:last-child {
    border-bottom: none;
}

.package-features li:before {
    content: "✓";
    color: var(--primary-color);
    font-weight: bold;
    margin-right: 0.75rem;
    font-size: 1.1rem;
}

.package-card .cta-button {
    width: 100%;
}

/* === FORM === */
.contact-form {
    max-width: 600px;
    margin: auto;
    background: white;
    padding: 2.5rem;
    border-radius: 20px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: var(--text-dark);
    font-size: 0.95rem;
}

input, select {
    width: 100%;
    padding: 0.9rem 1rem;
    border-radius: 10px;
    border: 2px solid #e2e8f0;
    font-family: inherit;
    font-size: 1rem;
    transition: var(--transition);
    background-color: white;
}

input:hover,
select:hover {
    border-color: #cbd5e1;
}

input:focus,
select:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 4px rgba(200, 155, 60, 0.15);
}

select {
    cursor: pointer;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 1rem center;
    padding-right: 3rem;
}

select:invalid {
    color: #94a3b8;
}

.submit-btn {
    margin-top: 0.5rem;
    padding: 1rem;
    width: 100%;
    background: var(--secondary-color);
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-size: 1.1rem;
    font-weight: bold;
    transition: var(--transition);
}

.submit-btn:hover,
.submit-btn:focus {
    background: var(--primary-color);
    color: var(--secondary-color);
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(200, 155, 60, 0.3);
}

/* === CART SIDEBAR - FIXED === */
.cart-sidebar {
    position: fixed;
    top: 0;
    right: -100%;
    width: 400px;
    max-width: 100%;
    height: 100vh;
    max-height: 100vh;
    background: white;
    box-shadow: -5px 0 30px rgba(0,0,0,0.2);
    transition: right 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: var(--z-sidebar);
    display: flex;
    flex-direction: column;
    visibility: hidden;
}

.cart-sidebar.open {
    right: 0;
    visibility: visible;
}

.cart-sidebar[aria-hidden="false"] {
    right: 0;
    visibility: visible;
}

/* Cart Header with Close Button */
.cart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    border-bottom: 2px solid #f1f5f9;
    background: white;
    flex-shrink: 0;
}

.cart-header h3 {
    font-size: 1.5rem;
    color: var(--secondary-color);
    margin: 0;
}

.cart-close-btn {
    background: #f1f5f9;
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.2rem;
    color: #64748b;
    transition: var(--transition);
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
}

.cart-close-btn:hover,
.cart-close-btn:focus {
    background: var(--accent-color);
    color: white;
    transform: rotate(90deg);
}

/* Cart Items Container */
.cart-items-container {
    flex: 1;
    overflow-y: auto;
    padding: 1rem 1.5rem;
}

/* Cart Item Styling */
.cart-item {
    padding: 1.25rem 0;
    border-bottom: 1px solid #e2e8f0;
}

.cart-item:last-child {
    border-bottom: none;
}

.cart-item-name {
    font-weight: 600;
    color: var(--secondary-color);
    margin-bottom: 0.75rem;
    font-size: 1.05rem;
}

.cart-item-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
}

/* Quantity Controls - STYLED */
.quantity-controls {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.qty-btn {
    width: 36px;
    height: 36px;
    border: 2px solid #e2e8f0;
    background: white;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1.2rem;
    font-weight: bold;
    color: var(--secondary-color);
    transition: var(--transition);
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
    user-select: none;
}

.qty-btn:hover {
    border-color: var(--primary-color);
    background: var(--primary-color);
    color: white;
}

.qty-btn:active {
    transform: scale(0.95);
}

.qty-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    background: #f1f5f9;
    border-color: #e2e8f0;
    color: #94a3b8;
}

.quantity-display {
    min-width: 40px;
    text-align: center;
    font-weight: 600;
    font-size: 1.1rem;
    color: var(--secondary-color);
}

.cart-item-price {
    font-weight: 700;
    color: var(--accent-color);
    font-size: 1.1rem;
    white-space: nowrap;
}

.remove-btn {
    background: transparent;
    border: none;
    color: #94a3b8;
    cursor: pointer;
    font-size: 0.85rem;
    padding: 0.25rem 0.5rem;
    margin-top: 0.5rem;
    transition: var(--transition);
    text-decoration: underline;
}

.remove-btn:hover {
    color: var(--accent-color);
}

/* Cart Footer */
.cart-footer {
    padding: 1.5rem;
    border-top: 2px solid #f1f5f9;
    background: white;
    flex-shrink: 0;
}

.cart-total-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    font-size: 1.1rem;
    padding: 0.5rem 0;
}

.cart-total-row span:first-child {
    color: #64748b;
}

.total-amount {
    color: var(--accent-color);
    font-size: 1.5rem;
    font-weight: bold;
}

.checkout-btn {
    width: 100%;
    padding: 1rem;
    font-size: 1.1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
}

/* Empty Cart */
.empty-cart {
    text-align: center;
    padding: 3rem 1rem;
    color: #94a3b8;
}

.empty-cart-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
    opacity: 0.5;
}

/* OVERLAY - FIXED */
.cart-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(15, 23, 42, 0.6);
    backdrop-filter: blur(4px);
    opacity: 0;
    visibility: hidden;
    transition: all 0.35s ease;
    z-index: var(--z-overlay);
    cursor: pointer;
}

.cart-overlay.active {
    opacity: 1;
    visibility: visible;
}

/* === FOOTER === */
footer {
    background: var(--secondary-color);
    color: white;
    text-align: center;
    padding: 2.5rem;
}

footer p {
    opacity: 0.8;
}

/* === RESPONSIVE === */
@media (max-width: 768px) {
    .mobile-menu-toggle {
        display: block;
        order: 2;
    }
    
    .cart-btn {
        order: 3;
    }

    .nav-links {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: var(--secondary-color);
        flex-direction: column;
        padding: 1rem 5%;
        gap: 0;
        box-shadow: 0 10px 20px rgba(0,0,0,0.2);
    }
    
    .nav-links.active {
        display: flex;
    }
    
    .nav-links li {
        border-bottom: 1px solid rgba(255,255,255,0.1);
    }
    
    .nav-links a {
        display: block;
        padding: 1rem 0;
    }

    .hero-content h1 {
        font-size: 2.2rem;
    }
    
    /* Mobile Cart - Full width */
    .cart-sidebar {
        width: 100%;
        right: -100%;
    }
    
    .cart-sidebar.open {
        right: 0;
    }
    
    .packages-grid {
        grid-template-columns: 1fr;
    }
    
    .package-card.featured {
        transform: none;
    }
    
    .package-card.featured:hover {
        transform: translateY(-8px);
    }
    
    .contact-form {
        padding: 1.5rem;
    }
    
    .menu-filters {
        gap: 0.5rem;
    }
    
    .menu-filters .cta-button {
        padding: 0.5rem 1rem;
        font-size: 0.9rem;
    }
}

/* Scrollbar styling for cart */
.cart-items-container::-webkit-scrollbar {
    width: 6px;
}

.cart-items-container::-webkit-scrollbar-track {
    background: #f1f5f9;
}

.cart-items-container::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 3px;
}

.cart-items-container::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
}

/* Animation for menu items */
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

.menu-item {
    animation: fadeIn 0.3s ease;
}
