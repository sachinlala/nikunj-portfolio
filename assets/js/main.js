// ============================================
// Main Portfolio JavaScript
// Updated: 2025-01-27 09:52 UTC - Interactive Features
// ============================================

(function() {
  'use strict';

  // DOM elements
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const header = document.getElementById('header');
  const themeToggle = document.getElementById('theme-toggle');

  // ============================================
  // Mobile Navigation Toggle
  // ============================================
  function initMobileNavigation() {
    if (navToggle) {
      navToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        
        // Toggle aria-expanded for accessibility
        const isExpanded = nav.classList.contains('active');
        navToggle.setAttribute('aria-expanded', isExpanded);
        
        // Animate hamburger menu
        navToggle.classList.toggle('active');
      });
    }

    // Close mobile menu when clicking nav links
    navLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        if (window.innerWidth <= 767) {
          nav.classList.remove('active');
          navToggle.classList.remove('active');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
      const isClickInsideNav = nav.contains(event.target);
      const isClickOnToggle = navToggle.contains(event.target);
      
      if (!isClickInsideNav && !isClickOnToggle && nav.classList.contains('active')) {
        nav.classList.remove('active');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ============================================
  // Smooth Scrolling for Navigation Links
  // ============================================
  function initSmoothScrolling() {
    navLinks.forEach(function(link) {
      link.addEventListener('click', function(e) {
        const href = link.getAttribute('href');
        
        // Only handle internal links (starting with #)
        if (href.startsWith('#')) {
          e.preventDefault();
          
          const targetId = href.substring(1);
          const targetElement = document.getElementById(targetId);
          
          if (targetElement) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight - 20;
            
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }
        }
      });
    });
  }

  // ============================================
  // Header Scroll Effect
  // ============================================
  function initHeaderScrollEffect() {
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Add/remove scrolled class for styling
      if (scrollTop > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      // Hide header on scroll down, show on scroll up (optional)
      /*
      if (scrollTop > lastScrollTop && scrollTop > 100) {
        header.style.transform = 'translateY(-100%)';
      } else {
        header.style.transform = 'translateY(0)';
      }
      */
      
      lastScrollTop = scrollTop;
    });
  }

  // ============================================
  // Active Navigation Link Highlighting
  // ============================================
  function initActiveNavHighlighting() {
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveNavLink() {
      const scrollPosition = window.scrollY + header.offsetHeight + 100;
      
      sections.forEach(function(section) {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition <= sectionTop + sectionHeight) {
          // Remove active class from all nav links
          navLinks.forEach(function(link) {
            link.classList.remove('active');
          });
          
          // Add active class to current section's nav link
          const activeLink = document.querySelector('.nav-link[href="#' + sectionId + '"]');
          if (activeLink) {
            activeLink.classList.add('active');
          }
        }
      });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink(); // Run on page load
  }

  // ============================================
  // Current Year in Footer
  // ============================================
  function updateCurrentYear() {
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
      currentYearElement.textContent = new Date().getFullYear();
    }
  }

  // ============================================
  // Intersection Observer for Animations
  // ============================================
  function initScrollAnimations() {
    // Check if browser supports IntersectionObserver
    if ('IntersectionObserver' in window) {
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      };

      const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      }, observerOptions);

      // Observe elements that should animate in
      const animateElements = document.querySelectorAll(
        '.interest-card, .contact-card'
      );
      
      animateElements.forEach(function(element) {
        observer.observe(element);
      });
    }
  }

  // ============================================
  // Form Handling (if contact form is added later)
  // ============================================
  function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic form validation
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        if (!name || !email || !message) {
          showNotification('Please fill in all fields.', 'error');
          return;
        }
        
        if (!isValidEmail(email)) {
          showNotification('Please enter a valid email address.', 'error');
          return;
        }
        
        // Here you would normally send the form data to a server
        showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
        contactForm.reset();
      });
    }
  }

  // ============================================
  // Utility Functions
  // ============================================
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 1rem 1.5rem;
      border-radius: 0.5rem;
      color: white;
      font-weight: 500;
      z-index: 9999;
      transform: translateX(400px);
      transition: transform 0.3s ease-in-out;
      max-width: 300px;
      word-wrap: break-word;
    `;
    
    // Set background color based on type
    const colors = {
      success: '#10b981',
      error: '#ef4444',
      info: '#3b82f6',
      warning: '#f59e0b'
    };
    notification.style.backgroundColor = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
      notification.style.transform = 'translateX(400px)';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 5000);
  }

  // ============================================
  // Keyboard Navigation Enhancement
  // ============================================
  function initKeyboardNavigation() {
    // Add keyboard support for mobile menu toggle
    if (navToggle) {
      navToggle.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          navToggle.click();
        }
      });
    }

    // Escape key to close mobile menu
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && nav.classList.contains('active')) {
        nav.classList.remove('active');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ============================================
  // Dark Mode Toggle
  // ============================================
  function initDarkModeToggle() {
    if (!themeToggle) return;

    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Update toggle button state
    updateThemeToggleIcon(savedTheme);

    themeToggle.addEventListener('click', function() {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeToggleIcon(newTheme);
      
      console.log(`Switched to ${newTheme} mode`);
    });

    // Keyboard support for theme toggle
    themeToggle.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        themeToggle.click();
      }
    });
  }

  function updateThemeToggleIcon(theme) {
    const sunIcon = themeToggle.querySelector('.sun-icon');
    const moonIcon = themeToggle.querySelector('.moon-icon');
    
    if (theme === 'dark') {
      sunIcon.style.display = 'block';
      moonIcon.style.display = 'none';
    } else {
      sunIcon.style.display = 'none';
      moonIcon.style.display = 'block';
    }
  }

  // ============================================
  // Performance Optimizations
  // ============================================
  function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // ============================================
  // Load Profile Data from JSON
  // ============================================
  async function loadProfileData() {
    try {
      const response = await fetch('data/profile.json');
      const profileData = await response.json();
      
      // Update header information
      const logoName = document.querySelector('.logo h1');
      const logoTagline = document.querySelector('.logo p');
      
      if (logoName && profileData.personal.name) {
        logoName.textContent = profileData.personal.name;
      }
      
      if (logoTagline && profileData.personal.tagline) {
        logoTagline.textContent = profileData.personal.tagline;
      }
      
      // Update hero section
      const heroTitle = document.querySelector('.hero-text h2');
      const heroDescription = document.querySelector('.hero-description');
      const profileImg = document.querySelector('.profile-img');
      
      // Keep the static 'About Me' title - don't override it
      // if (heroTitle && profileData.personal.name) {
      //   heroTitle.innerHTML = `Hi, I'm ${profileData.personal.name.split(' ')[0]}! 👋`;
      // }
      
      if (heroDescription && profileData.personal.bio) {
        // Convert \n characters to HTML line breaks
        const bioWithBreaks = profileData.personal.bio.replace(/\n/g, '<br>');
        heroDescription.innerHTML = bioWithBreaks;
      }
      
      if (profileImg && profileData.personal.avatar) {
        profileImg.src = profileData.personal.avatar;
        profileImg.alt = `${profileData.personal.name} - Student Developer`;
      }
      
      // Update interests section - TEMPORARILY DISABLED TO FIX DISAPPEARING CONTENT
      // We'll re-enable this once we fix the underlying issue
      /*
      const interestsGrid = document.querySelector('.interests-grid');
      if (interestsGrid && profileData.interests && profileData.interests.length > 0) {
        console.log('Updating interests section with', profileData.interests.length, 'interests');
        
        // Store original content as fallback
        const originalContent = interestsGrid.innerHTML;
        
        try {
          // Clear existing interests
          interestsGrid.innerHTML = '';
          
          // Add new interests from JSON
          profileData.interests.forEach(function(interest) {
            const interestCard = document.createElement('div');
            interestCard.className = 'interest-card';
            interestCard.innerHTML = `
              <div class="interest-icon">${interest.icon}</div>
              <h3>${interest.title}</h3>
              <p>${interest.description}</p>
            `;
            interestsGrid.appendChild(interestCard);
          });
          
          console.log('Interests section updated successfully!');
        } catch (error) {
          console.error('Error updating interests section:', error);
          // Restore original content if there's an error
          interestsGrid.innerHTML = originalContent;
        }
      } else {
        console.warn('Could not update interests:', !interestsGrid ? 'Grid not found' : 'No interests data');
        // Keep original static content if no dynamic data
      }
      */
      
      console.log('Dynamic interests loading temporarily disabled - using static HTML content');
      
      // Update contact links
      const emailLink = document.querySelector('a[href^="mailto:"]');
      const githubLink = document.querySelector('a[href*="github"]');
      
      if (emailLink && profileData.personal.email) {
        emailLink.href = `mailto:${profileData.personal.email}`;
      }
      
      if (githubLink && profileData.personal.github) {
        githubLink.href = profileData.personal.github;
      }
      
      console.log('Profile data loaded successfully!');
      
    } catch (error) {
      console.warn('Could not load profile data:', error);
      // Continue with static content if JSON fails to load
    }
  }

  // ============================================
  // Initialize Everything
  // ============================================
  function init() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }

    // Load profile data first
    loadProfileData();
    
    // Initialize all functionality
    initMobileNavigation();
    initSmoothScrolling();
    initHeaderScrollEffect();
    initActiveNavHighlighting();
    updateCurrentYear();
    initScrollAnimations();
    initContactForm();
    initKeyboardNavigation();
    initDarkModeToggle();

    // Add loaded class to body for any CSS animations
    document.body.classList.add('loaded');
    
    console.log('🚀 Portfolio initialized successfully!');
    console.log('📅 Interactive features loaded - Updated: Jan 27, 2025');
    console.log('✨ Features: Mobile Nav, Smooth Scroll, Animations, Form Validation');
  }

  // Start initialization
  init();

})();

// ============================================
// Additional CSS for JavaScript enhancements
// ============================================
const additionalStyles = `
  /* Animation classes for scroll effects */
  .interest-card,
  .contact-card {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  }

  .interest-card.animate-in,
  .contact-card.animate-in {
    opacity: 1;
    transform: translateY(0);
  }

  /* Mobile navigation active state */
  .nav-toggle.active span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
  }

  .nav-toggle.active span:nth-child(2) {
    opacity: 0;
  }

  .nav-toggle.active span:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -6px);
  }

  /* Header scroll state */
  .header.scrolled {
    background-color: rgba(255, 255, 255, 0.98);
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  }

  /* Active navigation link */
  .nav-link.active {
    color: var(--primary-color);
  }

  .nav-link.active::after {
    width: 100%;
  }

  /* Skip to content link for accessibility */
  .skip-to-content {
    position: absolute;
    top: -40px;
    left: 6px;
    background: var(--primary-color);
    color: white;
    padding: 8px;
    text-decoration: none;
    border-radius: 4px;
    z-index: 9999;
    transition: top 0.3s;
  }

  .skip-to-content:focus {
    top: 6px;
  }

  /* Clickable interest card styles */
  .interest-card-link {
    text-decoration: none;
    color: inherit;
    display: block;
    position: relative;
    overflow: hidden;
  }

  .interest-card-link:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15);
    color: inherit;
  }

  .card-link-indicator {
    font-size: 0.85rem;
    color: var(--primary-color, #3b82f6);
    font-weight: 500;
    margin-top: 1rem;
    opacity: 0;
    transform: translateY(10px);
    transition: all 0.3s ease;
  }

  .interest-card-link:hover .card-link-indicator {
    opacity: 1;
    transform: translateY(0);
  }

  .interest-card-link:focus {
    outline: 2px solid var(--primary-color, #3b82f6);
    outline-offset: 2px;
  }

  /* Nike-Inspired Metallic Dark Theme */
  :root {
    --bg-primary: #ffffff;
    --bg-secondary: #f7f7f7;
    --text-primary: #111111;
    --text-secondary: #757575;
    --border-color: rgba(0, 0, 0, 0.08);
    --shadow-light: rgba(0, 0, 0, 0.05);
    --shadow-medium: rgba(0, 0, 0, 0.1);
    --primary-color: #111111;
    --accent-color: #ff6b00;
    --metallic-gradient: linear-gradient(135deg, #2d3748, #4a5568, #718096);
    --metallic-text: linear-gradient(135deg, #e2e8f0, #cbd5e0, #a0aec0);
  }

  [data-theme="dark"] {
    --bg-primary: #0d0d0d;
    --bg-secondary: #1a1a1a;
    --bg-tertiary: #2d2d30;
    --text-primary: #f7fafc;
    --text-secondary: #e2e8f0;
    --text-accent: #ffd700;
    --border-color: rgba(255, 255, 255, 0.1);
    --shadow-light: rgba(0, 0, 0, 0.3);
    --shadow-medium: rgba(0, 0, 0, 0.5);
    --primary-color: #ffd700;
    --accent-color: #ff6b00;
    --metallic-gradient: linear-gradient(135deg, #2d3748, #4a5568, #ffd700);
    --metallic-text: linear-gradient(135deg, #ffd700, #f6e05e, #ecc94b);
    --nike-gradient: linear-gradient(135deg, #1a1a1a, #2d2d30, #ffd700);
  }

  [data-theme="dark"] body {
    background-color: var(--bg-primary) !important;
    color: var(--text-primary) !important;
  }

  [data-theme="dark"] .header {
    background-color: var(--bg-primary) !important;
    border-bottom: 1px solid var(--border-color);
  }

  [data-theme="dark"] .header.scrolled {
    background-color: rgba(0, 0, 0, 0.98) !important;
    box-shadow: 0 2px 20px var(--shadow-medium);
  }

  [data-theme="dark"] .interest-card,
  [data-theme="dark"] .contact-card {
    background-color: var(--bg-secondary) !important;
    border: 1px solid var(--border-color);
    box-shadow: 0 2px 4px var(--shadow-light);
  }

  [data-theme="dark"] .interest-card:hover,
  [data-theme="dark"] .contact-card:hover {
    box-shadow: 0 8px 15px var(--shadow-medium);
    background-color: var(--bg-secondary) !important;
  }

  [data-theme="dark"] .btn {
    background-color: var(--bg-primary) !important;
    color: var(--text-primary) !important;
    border: 2px solid var(--border-color);
  }

  [data-theme="dark"] .btn:hover {
    background-color: var(--bg-secondary) !important;
    border-color: var(--text-primary);
  }

  [data-theme="dark"] .btn-secondary {
    background-color: var(--bg-primary) !important;
    border: 2px solid var(--border-color);
    color: var(--text-primary) !important;
  }

  [data-theme="dark"] .footer {
    background-color: var(--bg-secondary) !important;
    border-top: 1px solid var(--border-color);
  }

  [data-theme="dark"] .hero {
    background-color: var(--bg-primary) !important;
  }

  [data-theme="dark"] .section {
    background-color: var(--bg-primary) !important;
  }

  [data-theme="dark"] main {
    background-color: var(--bg-primary) !important;
  }

  [data-theme="dark"] * {
    border-color: var(--border-color);
  }

  [data-theme="dark"] a {
    color: var(--text-primary);
  }

  [data-theme="dark"] .nav-link:hover {
    color: var(--text-primary) !important;
  }

  /* Theme Toggle Button */
  .theme-toggle {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: 2px solid var(--border-color, rgba(0, 0, 0, 0.08));
    border-radius: 0.5rem;
    padding: 0.5rem;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    z-index: 1000;
  }

  .theme-toggle:hover {
    background-color: var(--bg-secondary, #f8fafc);
    border-color: var(--primary-color, #3b82f6);
  }

  .theme-toggle:focus {
    outline: 2px solid var(--primary-color, #3b82f6);
    outline-offset: 2px;
  }

  .theme-toggle-icon {
    width: 1.2rem;
    height: 1.2rem;
    position: relative;
  }

  .theme-toggle-icon svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: var(--text-primary, #1a1a1a);
    transition: opacity 0.3s ease;
  }

  .sun-icon {
    display: none;
  }

  .moon-icon {
    display: block;
  }

  /* Nike-Inspired Design Enhancements */
  
  /* Light Theme Enhancements */
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-weight: 400;
    letter-spacing: -0.01em;
  }

  .header {
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border-color);
  }

  .logo h1 {
    font-weight: 700;
    font-size: 1.5rem;
    letter-spacing: -0.02em;
  }

  .nav-link {
    font-weight: 500;
    letter-spacing: -0.01em;
    position: relative;
    transition: all 0.3s ease;
  }

  .nav-link::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--primary-color);
    transition: width 0.3s ease;
  }

  .nav-link:hover::after {
    width: 100%;
  }

  .btn {
    font-weight: 600;
    letter-spacing: -0.01em;
    border-radius: 2rem;
    padding: 0.875rem 2rem;
    border: 2px solid var(--primary-color);
    background: var(--primary-color);
    color: white;
    transition: all 0.3s ease;
    text-transform: uppercase;
    font-size: 0.875rem;
  }

  .btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }

  .btn-secondary {
    background: transparent;
    color: var(--primary-color);
  }

  .btn-secondary:hover {
    background: var(--primary-color);
    color: white;
  }

  .interest-card,
  .contact-card {
    border-radius: 1rem;
    border: 1px solid var(--border-color);
    background: var(--bg-primary);
    transition: all 0.4s ease;
    position: relative;
    overflow: hidden;
  }

  .interest-card::before,
  .contact-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transition: left 0.6s ease;
  }

  .interest-card:hover::before,
  .contact-card:hover::before {
    left: 100%;
  }

  .interest-card:hover,
  .contact-card:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  }

  .section-title {
    font-weight: 700;
    letter-spacing: -0.02em;
    font-size: 2.5rem;
  }

  /* Dark Theme Nike-Style Enhancements */
  [data-theme="dark"] .header {
    background: var(--nike-gradient) !important;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
  }

  [data-theme="dark"] .logo h1 {
    background: var(--metallic-text);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 800;
  }

  [data-theme="dark"] .section-title {
    background: var(--metallic-text);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  [data-theme="dark"] .hero-text h2 {
    background: var(--metallic-text);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  [data-theme="dark"] .interest-card,
  [data-theme="dark"] .contact-card {
    background: var(--nike-gradient) !important;
    border: 1px solid rgba(255, 215, 0, 0.2);
    box-shadow: 0 4px 20px rgba(255, 215, 0, 0.1);
  }

  [data-theme="dark"] .interest-card::before,
  [data-theme="dark"] .contact-card::before {
    background: linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.2), transparent);
  }

  [data-theme="dark"] .interest-card:hover,
  [data-theme="dark"] .contact-card:hover {
    box-shadow: 0 20px 40px rgba(255, 215, 0, 0.2);
    border-color: var(--text-accent);
  }

  [data-theme="dark"] .btn {
    background: var(--metallic-gradient) !important;
    border: 2px solid var(--text-accent) !important;
    color: var(--bg-primary) !important;
    font-weight: 700;
    text-shadow: none;
  }

  [data-theme="dark"] .btn:hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 15px 35px rgba(255, 215, 0, 0.3);
    border-color: var(--text-accent) !important;
  }

  [data-theme="dark"] .btn-secondary {
    background: transparent !important;
    color: var(--text-accent) !important;
  }

  [data-theme="dark"] .btn-secondary:hover {
    background: var(--text-accent) !important;
    color: var(--bg-primary) !important;
  }

  [data-theme="dark"] .footer {
    background: var(--nike-gradient) !important;
    border-top: 1px solid rgba(255, 215, 0, 0.2);
  }

  [data-theme="dark"] .nav-link::after {
    background: var(--text-accent);
  }

  [data-theme="dark"] .theme-toggle {
    border-color: var(--text-accent);
    background: rgba(255, 215, 0, 0.1);
  }

  [data-theme="dark"] .theme-toggle:hover {
    background: var(--text-accent) !important;
    box-shadow: 0 0 20px rgba(255, 215, 0, 0.4);
  }

  [data-theme="dark"] .theme-toggle:hover svg {
    color: var(--bg-primary);
  }

  /* Sports page specific styling */
  [data-theme="dark"] .sport-highlight h2 {
    background: var(--metallic-text);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  [data-theme="dark"] .page-title {
    background: var(--metallic-text);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  /* Responsive adjustments for theme toggle */
  @media (max-width: 768px) {
    .theme-toggle {
      left: 0.5rem;
      width: 2rem;
      height: 2rem;
      padding: 0.375rem;
    }

    .theme-toggle-icon {
      width: 1rem;
      height: 1rem;
    }

    .section-title {
      font-size: 2rem;
    }

    .btn {
      padding: 0.75rem 1.5rem;
      font-size: 0.8rem;
    }
  }

  /* Additional Nike-style micro-interactions */
  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .header-content {
    position: relative;
  }

  [data-theme="dark"] body {
    background: radial-gradient(ellipse at top, #1a1a1a, #0d0d0d) !important;
  }

  [data-theme="dark"] .hero {
    background: radial-gradient(ellipse at center, #1a1a1a, #0d0d0d) !important;
  }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);
