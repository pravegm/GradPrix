/**
 * GradPrix - MBA Admissions Consulting
 * Premium JavaScript Experience
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initNavbar();
  initMobileMenu();
  initFAQAccordion();
  initSmoothScroll();
  initFormHandling();
  initAnimations();
  initPremiumEffects();
});

/**
 * Navbar scroll effect
 */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  
  let lastScroll = 0;
  
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    // Add/remove scrolled class
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });
}

/**
 * Mobile menu toggle
 */
function initMobileMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const navbarMenu = document.getElementById('navbarMenu');
  
  if (!menuToggle || !navbarMenu) return;
  
  menuToggle.addEventListener('click', function() {
    navbarMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
    
    // Toggle body scroll when menu is open
    document.body.style.overflow = navbarMenu.classList.contains('active') ? 'hidden' : '';
    
    // Animate hamburger icon
    const spans = menuToggle.querySelectorAll('span');
    if (menuToggle.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });
  
  // Close menu when clicking on a link
  const navLinks = navbarMenu.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navbarMenu.classList.remove('active');
      menuToggle.classList.remove('active');
      document.body.style.overflow = '';
      
      const spans = menuToggle.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    });
  });
  
  // Close menu on resize
  window.addEventListener('resize', function() {
    if (window.innerWidth > 968) {
      navbarMenu.classList.remove('active');
      menuToggle.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

/**
 * FAQ Accordion
 */
function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    if (question) {
      question.addEventListener('click', function() {
        // Close other items (optional - for single-open accordion)
        // faqItems.forEach(otherItem => {
        //   if (otherItem !== item) {
        //     otherItem.classList.remove('active');
        //   }
        // });
        
        // Toggle current item
        item.classList.toggle('active');
      });
    }
  });
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Skip if it's just "#"
      if (href === '#') return;
      
      const target = document.querySelector(href);
      
      if (target) {
        e.preventDefault();
        
        const navbarHeight = document.getElementById('navbar')?.offsetHeight || 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Form handling with Google Apps Script email integration
 */

// Google Apps Script Web App URL - Replace with your deployed script URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxc1nZ7L_rjz6rTjgIhjeyJbG0_ix6c6vr_cZeJVLJp21Ej3vkhqYmzkhnqixzWQdFOVQ/exec';

function initFormHandling() {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(this);
      const data = Object.fromEntries(formData.entries());
      
      // Basic validation
      if (!data.firstName || !data.lastName || !data.email) {
        showNotification('Please fill in all required fields.', 'error');
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
      }
      
      // Update button state
      const submitButton = this.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      submitButton.textContent = 'Submitting...';
      submitButton.disabled = true;
      
      try {
        // Send to Google Apps Script
        const response = await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors', // Required for Google Apps Script
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone || 'Not provided',
            targetSchools: data.targetSchools || 'Not specified',
            applicationRound: data.applicationRound || 'Not selected',
            service: data.service || 'Not selected',
            message: data.message || 'No message provided',
            newsletter: data.newsletter === 'on' ? 'Yes' : 'No',
            submittedAt: new Date().toISOString()
          })
        });
        
        // With no-cors, we can't read the response, so we assume success
        // Reset form
        this.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Show success message
        showNotification('Thank you for your inquiry! We\'ll be in touch within 24 hours.', 'success');
        
      } catch (error) {
        console.error('Form submission error:', error);
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        showNotification('Something went wrong. Please try again or email us directly at support@gradprix.com', 'error');
      }
    });
  }
  
  // Newsletter forms
  const newsletterForms = document.querySelectorAll('form:not(#contactForm)');
  newsletterForms.forEach(form => {
    const emailInput = form.querySelector('input[type="email"]');
    if (emailInput) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = emailInput.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email || !emailRegex.test(email)) {
          showNotification('Please enter a valid email address.', 'error');
          return;
        }
        
        // Simulate subscription
        emailInput.value = '';
        showNotification('Thank you for subscribing! Check your inbox for a confirmation.', 'success');
      });
    }
  });
}

/**
 * Show notification
 */
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }
  
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <span class="notification-message">${message}</span>
      <button class="notification-close" aria-label="Close">&times;</button>
    </div>
  `;
  
  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    z-index: 9999;
    padding: 16px 24px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    max-width: 400px;
    animation: slideIn 0.3s ease forwards;
    background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
    color: white;
  `;
  
  // Add animation keyframes
  if (!document.querySelector('#notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
      }
      .notification-content {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 24px;
        cursor: pointer;
        padding: 0;
        line-height: 1;
        opacity: 0.8;
      }
      .notification-close:hover {
        opacity: 1;
      }
    `;
    document.head.appendChild(style);
  }
  
  document.body.appendChild(notification);
  
  // Close button functionality
  const closeButton = notification.querySelector('.notification-close');
  closeButton.addEventListener('click', () => {
    notification.style.animation = 'slideOut 0.3s ease forwards';
    setTimeout(() => notification.remove(), 300);
  });
  
  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.animation = 'slideOut 0.3s ease forwards';
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}

/**
 * Scroll animations - Premium reveal effects
 */
function initAnimations() {
  // Check if IntersectionObserver is supported
  if (!('IntersectionObserver' in window)) return;
  
  const animatedElements = document.querySelectorAll('.service-card, .testimonial-card, .team-card, .blog-card, .process-step, .stat-item, .section-header, .school-logo-item, .faq-item');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px'
  });
  
  animatedElements.forEach((el, index) => {
    // Stagger animation based on siblings - fast and snappy
    const siblings = el.parentElement?.children;
    const siblingIndex = siblings ? Array.from(siblings).indexOf(el) : index;
    const delay = Math.min(siblingIndex * 0.04, 0.16);
    
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = `opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s, transform 0.35s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s`;
    observer.observe(el);
  });
}

/**
 * Premium interactive effects
 */
function initPremiumEffects() {
  // Smooth cursor follower for buttons (subtle effect)
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(btn => {
    btn.addEventListener('mousemove', function(e) {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      btn.style.setProperty('--mouse-x', `${x}px`);
      btn.style.setProperty('--mouse-y', `${y}px`);
    });
  });
  
  // Parallax effect for hero decoration
  const heroDecoration = document.querySelector('.hero-decoration');
  if (heroDecoration) {
    window.addEventListener('scroll', throttle(function() {
      const scrolled = window.pageYOffset;
      if (scrolled < window.innerHeight) {
        heroDecoration.style.transform = `translateY(${scrolled * 0.3}px)`;
      }
    }, 16));
  }
  
  // Section header reveal animation
  const sectionHeaders = document.querySelectorAll('.section-header');
  const headerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        headerObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  
  sectionHeaders.forEach(header => {
    headerObserver.observe(header);
  });
  
  // Add smooth hover tilt to cards
  const cards = document.querySelectorAll('.service-card, .testimonial-card, .team-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 30;
      const rotateY = (centerX - x) / 30;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });
    
    card.addEventListener('mouseleave', function() {
      card.style.transform = '';
    });
  });
  
  // Navbar hide on scroll down, show on scroll up
  let lastScrollY = window.pageYOffset;
  const navbar = document.getElementById('navbar');
  
  window.addEventListener('scroll', throttle(function() {
    const currentScrollY = window.pageYOffset;
    
    if (currentScrollY > lastScrollY && currentScrollY > 200) {
      navbar.style.transform = 'translateY(-100%)';
    } else {
      navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollY = currentScrollY;
  }, 100));
  
  // Add CSS for premium effects
  const premiumStyles = document.createElement('style');
  premiumStyles.textContent = `
    .section-header {
      opacity: 0;
      transform: translateY(14px);
      transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .section-header.animate-in {
      opacity: 1;
      transform: translateY(0);
    }
    
    .navbar {
      transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), background 0.2s ease, box-shadow 0.2s ease;
    }
    
    .service-card, .testimonial-card, .team-card {
      transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s ease, border-color 0.2s ease !important;
    }
    
    /* Button glow effect */
    .btn-gold::after {
      content: '';
      position: absolute;
      top: var(--mouse-y, 50%);
      left: var(--mouse-x, 50%);
      width: 0;
      height: 0;
      background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 60%);
      transform: translate(-50%, -50%);
      transition: width 0.3s ease, height 0.3s ease;
      pointer-events: none;
    }
    
    .btn-gold:hover::after {
      width: 200px;
      height: 200px;
    }
    
    /* Smooth scrollbar */
    ::-webkit-scrollbar {
      width: 10px;
    }
    
    ::-webkit-scrollbar-track {
      background: #f1f1f1;
    }
    
    ::-webkit-scrollbar-thumb {
      background: #1a2744;
      border-radius: 5px;
    }
    
    ::-webkit-scrollbar-thumb:hover {
      background: #2d3f5f;
    }
  `;
  document.head.appendChild(premiumStyles);
}

/**
 * Counter animation for stats
 */
function animateCounter(element, target, duration = 1000) {
  const start = 0;
  const startTime = performance.now();
  
  function updateCounter(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    const current = Math.round(start + (target - start) * easeOutQuart);
    
    element.textContent = current;
    
    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    }
  }
  
  requestAnimationFrame(updateCounter);
}

/**
 * Utility: Debounce function
 */
function debounce(func, wait) {
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

/**
 * Utility: Throttle function
 */
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
