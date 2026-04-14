// Navbar management for IS4460 course website

async function loadNavbar() {
    try {
        const response = await fetch('navbar.html');
        const navbarHtml = await response.text();
        
        // Insert navbar into the page
        const navContainer = document.getElementById('navbar-container');
        if (navContainer) {
            navContainer.innerHTML = navbarHtml;
            
            // Set active state based on current page
            setActiveNavItem();
        }
    } catch (error) {
        console.error('Error loading navbar:', error);
        // Fallback: create basic navbar if fetch fails
        createFallbackNavbar();
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

function createFallbackNavbar() {
    // Fallback navbar in case fetch fails
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

// Load navbar when page loads
document.addEventListener('DOMContentLoaded', loadNavbar);