// Enhanced Site JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Set copyright year
    const copyrightYear = document.getElementById('copyright-year');
    if (copyrightYear) {
        copyrightYear.textContent = new Date().getFullYear();
    }

    // Mobile menu functionality
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');

    function openMobileMenu() {
        mobileMenu.classList.remove('translate-x-full');
        mobileMenuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        mobileMenu.classList.add('translate-x-full');
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', openMobileMenu);
    }

    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', closeMobileMenu);
    }

    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', closeMobileMenu);
    }

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Back to top button
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });

        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Counter animation
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    const animateCounter = (counter) => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    };

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add visible class for fade animations
                if (entry.target.classList.contains('fade-in') ||
                    entry.target.classList.contains('slide-in-left') ||
                    entry.target.classList.contains('slide-in-right') ||
                    entry.target.classList.contains('scale-in')) {
                    entry.target.classList.add('visible');
                }

                // Start counter animation
                if (entry.target.classList.contains('counter')) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe all animated elements
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in, .counter').forEach(el => {
        observer.observe(el);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Clear any previous messages
            formMessage.textContent = '';
            formMessage.className = 'mb-4 hidden';

            // Get form data
            const formData = new FormData(contactForm);

            // Basic client-side validation
            const requiredFields = ['name', 'email', 'company', 'outcome', 'timeline'];
            let isValid = true;

            for (const field of requiredFields) {
                const value = formData.get(field);
                if (!value || value.trim() === '') {
                    isValid = false;
                    document.getElementById(field).classList.add('border-red-500');
                } else {
                    document.getElementById(field).classList.remove('border-red-500');
                }
            }

            if (!isValid) {
                formMessage.textContent = 'Please fill in all required fields.';
                formMessage.className = 'mb-4 p-3 bg-red-100 text-red-700 rounded-md';
                return;
            }

            // Email validation
            const email = formData.get('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                formMessage.textContent = 'Please enter a valid email address.';
                formMessage.className = 'mb-4 p-3 bg-red-100 text-red-700 rounded-md';
                document.getElementById('email').classList.add('border-red-500');
                return;
            }

            try {
                // Submit to Formspree
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Success message
                    formMessage.textContent = 'Thanks, we will reply within one business day.';
                    formMessage.className = 'mb-4 p-3 bg-green-100 text-green-700 rounded-md';
                    contactForm.reset();
                } else {
                    // Error message
                    formMessage.textContent = 'Something went wrong. Please try again or email us directly.';
                    formMessage.className = 'mb-4 p-3 bg-red-100 text-red-700 rounded-md';
                }
            } catch (error) {
                // Network error
                formMessage.textContent = 'Connection error. Please check your internet and try again.';
                formMessage.className = 'mb-4 p-3 bg-red-100 text-red-700 rounded-md';
            }
        });

        // Remove error styling when user starts typing
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                this.classList.remove('border-red-500');
            });
        });
    }

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Close mobile menu on Escape
        if (e.key === 'Escape' && mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            mobileMenuButton.setAttribute('aria-label', 'Open menu');
            mobileMenuButton.focus();
        }
    });

    // Add focus management for skip link
    const skipLink = document.querySelector('a[href="#main"]');
    if (skipLink) {
        skipLink.addEventListener('click', function(e) {
            e.preventDefault();
            const main = document.getElementById('main');
            if (main) {
                main.setAttribute('tabindex', '-1');
                main.focus();
                main.scrollIntoView();
            }
        });
    }
});