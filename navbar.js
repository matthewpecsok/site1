// Shared components management for IS4460 course website

async function loadSharedComponents() {
    try {
        // Load header and navbar in parallel
        const [headerResponse, navbarResponse] = await Promise.all([
            fetch('header.html'),
            fetch('navbar.html')
        ]);
        
        const headerHtml = await headerResponse.text();
        const navbarHtml = await navbarResponse.text();
        
        // Insert header
        const headerContainer = document.getElementById('header-container');
        if (headerContainer) {
            headerContainer.innerHTML = headerHtml;
            setHeaderSubtitle();
        }
        
        // Insert navbar
        const navContainer = document.getElementById('navbar-container');
        if (navContainer) {
            navContainer.innerHTML = navbarHtml;
            setActiveNavItem();
        }
    } catch (error) {
        console.error('Error loading shared components:', error);
        // Fallback: create basic components if fetch fails
        createFallbackComponents();
    }
}

function setHeaderSubtitle() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const subtitleElement = document.getElementById('header-subtitle');
    
    if (subtitleElement) {
        switch (currentPage) {
            case 'index.html':
            case '':
                subtitleElement.textContent = 'Welcome to your first day of class! We\'re excited to have you here.';
                subtitleElement.className = 'welcome-message';
                break;
            case 'day1.html':
                subtitleElement.textContent = 'Day 1: HTML & CSS Fundamentals';
                subtitleElement.className = 'subtitle';
                break;
            case 'day2.html':
                subtitleElement.textContent = 'Day 2: Database Integration';
                subtitleElement.className = 'subtitle';
                break;
        }
    }
}

function setActiveNavItem() {
    // Get current page filename
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Remove existing active classes
    const navLinks = document.querySelectorAll('.nav-bar a');
    navLinks.forEach(link => link.classList.remove('active'));
    
    // Add active class to current page link
    let activeId = '';
    switch (currentPage) {
        case 'index.html':
        case '':
            activeId = 'nav-home';
            break;
        case 'day1.html':
            activeId = 'nav-day1';
            break;
        case 'day2.html':
            activeId = 'nav-day2';
            break;
    }
    
    if (activeId) {
        const activeLink = document.getElementById(activeId);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
}

function createFallbackComponents() {
    // Fallback header
    const headerContainer = document.getElementById('header-container');
    if (headerContainer) {
        headerContainer.innerHTML = `
            <header class="header">
                <div class="university-logo">🏛️ UNIVERSITY OF UTAH</div>
                <h1 class="course-title">IS 4460</h1>
                <p class="welcome-message" id="header-subtitle">Welcome to your first day of class! We're excited to have you here.</p>
                <div class="japanese-flag"></div>
            </header>
        `;
        setHeaderSubtitle();
    }
    
    // Fallback navbar
    const navContainer = document.getElementById('navbar-container');
    if (navContainer) {
        navContainer.innerHTML = `
            <nav class="nav-bar">
                <a href="index.html" id="nav-home">🏠 Home</a>
                <a href="day1.html" id="nav-day1">📝 Day 1: HTML/CSS</a>
                <a href="day2.html" id="nav-day2">🗄️ Day 2: Databases</a>
            </nav>
        `;
        setActiveNavItem();
    }
}

// Load shared components when page loads
document.addEventListener('DOMContentLoaded', loadSharedComponents);