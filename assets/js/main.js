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
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);
