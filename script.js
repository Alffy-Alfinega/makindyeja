/*
Makindye Junior Academy - Interactive JavaScript Features
Professional school website functionality
*/

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initScrollAnimations();
    initBackToTop();
    initMobileNavigation();
    initTestimonialSlider();
    initAnimatedCounters();
    initGalleryFilter();
    initLightbox();
    initFormValidation();
    initSmoothScrolling();
    initLazyLoading();
});

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// ===== BACK TO TOP BUTTON =====
function initBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    
    if (!backToTopButton) return;
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== MOBILE NAVIGATION =====
function initMobileNavigation() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    if (!navbarToggler || !navbarCollapse) return;
    
    // Simple mobile dropdown handler
    function setupMobileDropdowns() {
        const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
        
        dropdownToggles.forEach(toggle => {
            // Remove any existing event listeners
            toggle.replaceWith(toggle.cloneNode(true));
        });
        
        // Get fresh references after cloning
        const freshToggles = document.querySelectorAll('.dropdown-toggle');
        
        freshToggles.forEach(toggle => {
            toggle.addEventListener('click', function(e) {
                const isMobile = window.innerWidth < 992;
                
                if (isMobile) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const dropdown = this.parentElement;
                    const dropdownMenu = dropdown.querySelector('.dropdown-menu');
                    
                    if (!dropdownMenu) return;
                    
                    // Close all other dropdowns
                    document.querySelectorAll('.dropdown').forEach(otherDropdown => {
                        if (otherDropdown !== dropdown) {
                            otherDropdown.classList.remove('show');
                            const otherMenu = otherDropdown.querySelector('.dropdown-menu');
                            if (otherMenu) {
                                otherMenu.style.display = 'none';
                            }
                        }
                    });
                    
                    // Toggle current dropdown
                    const isOpen = dropdown.classList.contains('show');
                    
                    if (isOpen) {
                        dropdown.classList.remove('show');
                        dropdownMenu.style.display = 'none';
                        this.setAttribute('aria-expanded', 'false');
                    } else {
                        dropdown.classList.add('show');
                        dropdownMenu.style.display = 'block';
                        this.setAttribute('aria-expanded', 'true');
                    }
                }
            });
        });
        
        // Handle dropdown item clicks
        const dropdownItems = document.querySelectorAll('.dropdown-item');
        dropdownItems.forEach(item => {
            item.addEventListener('click', function() {
                // Close mobile menu after clicking
                if (navbarCollapse.classList.contains('show')) {
                    navbarCollapse.classList.remove('show');
                }
                // Close all dropdowns
                document.querySelectorAll('.dropdown').forEach(dropdown => {
                    dropdown.classList.remove('show');
                    const menu = dropdown.querySelector('.dropdown-menu');
                    if (menu) {
                        menu.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Initial setup
    setupMobileDropdowns();
    
    // Handle regular nav links (not dropdowns)
    navLinks.forEach(link => {
        if (!link.classList.contains('dropdown-toggle')) {
            link.addEventListener('click', function() {
                if (navbarCollapse.classList.contains('show')) {
                    navbarCollapse.classList.remove('show');
                }
            });
        }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNavbar = navbarCollapse.contains(event.target);
        const isClickOnToggler = navbarToggler.contains(event.target);
        
        if (!isClickInsideNavbar && !isClickOnToggler && navbarCollapse.classList.contains('show')) {
            navbarCollapse.classList.remove('show');
            // Close dropdowns
            document.querySelectorAll('.dropdown').forEach(dropdown => {
                dropdown.classList.remove('show');
                const menu = dropdown.querySelector('.dropdown-menu');
                if (menu) {
                    menu.style.display = 'none';
                }
            });
        }
    });
    
    // Handle window resize - reset dropdowns when switching to desktop
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth >= 992) {
                // Reset to desktop mode
                document.querySelectorAll('.dropdown').forEach(dropdown => {
                    dropdown.classList.remove('show');
                    const menu = dropdown.querySelector('.dropdown-menu');
                    if (menu) {
                        menu.style.display = '';
                    }
                });
                // Re-setup for next mobile session
                setupMobileDropdowns();
            }
        }, 250);
    });
}

// ===== TESTIMONIAL SLIDER =====
function initTestimonialSlider() {
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const prevButton = document.querySelector('.testimonial-prev');
    const nextButton = document.querySelector('.testimonial-next');
    
    if (!testimonialItems.length) return;
    
    let currentIndex = 0;
    
    function showTestimonial(index) {
        testimonialItems.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });
    }
    
    function nextTestimonial() {
        currentIndex = (currentIndex + 1) % testimonialItems.length;
        showTestimonial(currentIndex);
    }
    
    function prevTestimonial() {
        currentIndex = (currentIndex - 1 + testimonialItems.length) % testimonialItems.length;
        showTestimonial(currentIndex);
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', nextTestimonial);
    }
    
    if (prevButton) {
        prevButton.addEventListener('click', prevTestimonial);
    }
    
    // Auto-rotate testimonials
    setInterval(nextTestimonial, 5000);
}

// ===== ANIMATED COUNTERS =====
function initAnimatedCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    if (!counters.length) return;
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// ===== GALLERY FILTER =====
function initGalleryFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (!filterButtons.length || !galleryItems.length) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.classList.remove('btn-primary');
                btn.classList.add('btn-outline-primary');
            });
            this.classList.add('active');
            this.classList.remove('btn-outline-primary');
            this.classList.add('btn-primary');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ===== LIGHTBOX =====
function initLightbox() {
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const viewButtons = document.querySelectorAll('.view-image');
    const closeLightbox = document.querySelector('.lightbox-close');
    
    if (!lightboxModal || !viewButtons.length) return;
    
    viewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const imageSrc = this.getAttribute('data-image');
            const caption = this.parentElement.querySelector('h5').textContent;
            
            lightboxImage.src = imageSrc;
            lightboxCaption.textContent = caption;
            lightboxModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });
    
    function closeLightboxModal() {
        lightboxModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    if (closeLightbox) {
        closeLightbox.addEventListener('click', closeLightboxModal);
    }
    
    lightboxModal.addEventListener('click', function(e) {
        if (e.target === lightboxModal) {
            closeLightboxModal();
        }
    });
    
    // Close with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightboxModal.style.display === 'block') {
            closeLightboxModal();
        }
    });
}

// ===== FORM VALIDATION =====
function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset previous validation states
        const formElements = contactForm.querySelectorAll('.form-control, .form-select');
        formElements.forEach(element => {
            element.classList.remove('is-invalid');
        });
        
        // Validate form
        let isValid = true;
        const requiredFields = contactForm.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.classList.add('is-invalid');
                isValid = false;
            } else {
                // Validate specific field types
                if (field.type === 'email') {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(field.value)) {
                        field.classList.add('is-invalid');
                        isValid = false;
                    }
                } else if (field.type === 'tel') {
                    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
                    if (!phoneRegex.test(field.value) || field.value.replace(/\D/g, '').length < 10) {
                        field.classList.add('is-invalid');
                        isValid = false;
                    }
                }
            }
        });
        
        if (isValid) {
            // Show success message (in real implementation, this would send to server)
            if (successMessage) {
                successMessage.style.display = 'block';
                contactForm.reset();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);
            }
        } else {
            // Show error message
            if (errorMessage) {
                errorMessage.style.display = 'block';
                
                // Hide error message after 5 seconds
                setTimeout(() => {
                    errorMessage.style.display = 'none';
                }, 5000);
            }
        }
    });
    
    // Remove invalid class on input
    const formInputs = contactForm.querySelectorAll('.form-control, .form-select');
    formInputs.forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('is-invalid');
        });
    });
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#' && href !== '#0') {
                const target = document.querySelector(href);
                
                if (target) {
                    e.preventDefault();
                    
                    const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// ===== LAZY LOADING =====
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if (!images.length) return;
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
                
                // Add fade-in effect
                img.style.opacity = '0';
                setTimeout(() => {
                    img.style.transition = 'opacity 0.3s ease-in';
                    img.style.opacity = '1';
                }, 100);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== NEWSLETTER FORM =====
function initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (!newsletterForm) return;
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            // Show success message
            const originalButton = this.querySelector('button[type="submit"]');
            const originalText = originalButton.textContent;
            
            originalButton.textContent = 'Subscribed!';
            originalButton.classList.remove('btn-primary');
            originalButton.classList.add('btn-success');
            originalButton.disabled = true;
            
            // Reset after 3 seconds
            setTimeout(() => {
                originalButton.textContent = originalText;
                originalButton.classList.remove('btn-success');
                originalButton.classList.add('btn-primary');
                originalButton.disabled = false;
                emailInput.value = '';
            }, 3000);
        } else {
            // Show error
            emailInput.classList.add('is-invalid');
            setTimeout(() => {
                emailInput.classList.remove('is-invalid');
            }, 3000);
        }
    });
}

// ===== SEARCH FUNCTIONALITY =====
function initSearchFunctionality() {
    const searchInput = document.querySelector('.search-form input');
    const searchButton = document.querySelector('.search-form button');
    
    if (!searchInput || !searchButton) return;
    
    searchButton.addEventListener('click', function(e) {
        e.preventDefault();
        const searchTerm = searchInput.value.trim();
        
        if (searchTerm) {
            // In a real implementation, this would perform actual search
            console.log('Searching for:', searchTerm);
            
            // Show loading state
            searchButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            searchButton.disabled = true;
            
            // Simulate search delay
            setTimeout(() => {
                searchButton.innerHTML = '<i class="fas fa-search"></i>';
                searchButton.disabled = false;
                
                // Show results or no results message
                alert(`Search results for "${searchTerm}" would appear here.`);
            }, 1000);
        }
    });
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchButton.click();
        }
    });
}

// ===== ACCORDION ENHANCEMENT =====
function initAccordionEnhancement() {
    const accordionButtons = document.querySelectorAll('.accordion-button');
    
    accordionButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add smooth animation
            const collapse = this.nextElementSibling;
            if (collapse && collapse.classList.contains('collapse')) {
                collapse.style.transition = 'all 0.3s ease-in-out';
            }
        });
    });
}

// ===== DATE/TIME DISPLAY =====
function initDateTimeDisplay() {
    const dateElements = document.querySelectorAll('.current-date');
    const timeElements = document.querySelectorAll('.current-time');
    
    function updateDateTime() {
        const now = new Date();
        
        if (dateElements.length) {
            const options = { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            };
            const dateString = now.toLocaleDateString('en-US', options);
            
            dateElements.forEach(element => {
                element.textContent = dateString;
            });
        }
        
        if (timeElements.length) {
            const timeString = now.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit'
            });
            
            timeElements.forEach(element => {
                element.textContent = timeString;
            });
        }
    }
    
    // Update immediately and then every minute
    updateDateTime();
    setInterval(updateDateTime, 60000);
}

// ===== COOKIE CONSENT =====
function initCookieConsent() {
    // Check if user has already consented
    if (localStorage.getItem('cookieConsent')) {
        return;
    }
    
    // Create cookie consent banner
    const consentBanner = document.createElement('div');
    consentBanner.className = 'cookie-consent';
    consentBanner.innerHTML = `
        <div class="cookie-consent-content">
            <p>This website uses cookies to improve your experience. By continuing to use this site, you agree to our use of cookies.</p>
            <div class="cookie-consent-buttons">
                <button class="btn btn-primary" id="acceptCookies">Accept</button>
                <button class="btn btn-outline-secondary" id="declineCookies">Decline</button>
            </div>
        </div>
    `;
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .cookie-consent {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(33, 37, 41, 0.95);
            color: white;
            padding: 1rem;
            z-index: 9999;
            backdrop-filter: blur(10px);
        }
        .cookie-consent-content {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 1rem;
        }
        .cookie-consent p {
            margin: 0;
            flex: 1;
            min-width: 300px;
        }
        .cookie-consent-buttons {
            display: flex;
            gap: 0.5rem;
        }
        @media (max-width: 768px) {
            .cookie-consent-content {
                flex-direction: column;
                text-align: center;
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(consentBanner);
    
    // Handle button clicks
    document.getElementById('acceptCookies').addEventListener('click', function() {
        localStorage.setItem('cookieConsent', 'accepted');
        consentBanner.remove();
    });
    
    document.getElementById('declineCookies').addEventListener('click', function() {
        localStorage.setItem('cookieConsent', 'declined');
        consentBanner.remove();
    });
}

// ===== PERFORMANCE MONITORING =====
function initPerformanceMonitoring() {
    // Log page load performance
    window.addEventListener('load', function() {
        if ('performance' in window) {
            const perfData = performance.getEntriesByType('navigation')[0];
            const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
            
            console.log(`Page load time: ${loadTime}ms`);
            
            // You could send this data to analytics service
            if (loadTime > 3000) {
                console.warn('Slow page load detected');
            }
        }
    });
}

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    
    // In production, you might want to send errors to a logging service
    // sendErrorToLoggingService(e.error);
});

// ===== UTILITY FUNCTIONS =====
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Initialize additional features when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initNewsletterForm();
    initSearchFunctionality();
    initAccordionEnhancement();
    initDateTimeDisplay();
    initCookieConsent();
    initPerformanceMonitoring();
});

// Handle window resize events
const handleResize = debounce(function() {
    // Recalculate any layout-dependent features
    console.log('Window resized');
}, 250);

window.addEventListener('resize', handleResize);

// Handle visibility change (when user switches tabs)
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pause animations, videos, etc.
        console.log('Page hidden');
    } else {
        // Resume animations, videos, etc.
        console.log('Page visible');
    }
});

// Export functions for potential use by other scripts
window.MakindyeAcademy = {
    initScrollAnimations,
    initBackToTop,
    initMobileNavigation,
    initTestimonialSlider,
    initAnimatedCounters,
    initGalleryFilter,
    initLightbox,
    initFormValidation,
    initSmoothScrolling,
    debounce,
    throttle
};
