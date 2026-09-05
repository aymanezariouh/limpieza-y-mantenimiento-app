// main.js - Limpiezas Gaitán

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // 2. Interactive accordion (example structure for FAQ in Services page)
    const accordions = document.querySelectorAll('.accordion-trigger');
    accordions.forEach(acc => {
        acc.addEventListener('click', function() {
            this.classList.toggle('active');
            const panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    });

    // 3. Back to Top Button Logic
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        // Show/hide based on scroll position
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.remove('opacity-0', 'invisible');
                backToTopBtn.classList.add('opacity-100', 'visible');
            } else {
                backToTopBtn.classList.remove('opacity-100', 'visible');
                backToTopBtn.classList.add('opacity-0', 'invisible');
            }
        });

        // Smooth scroll to top on click
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 4. Contact Form Validation & Toast Notification
    const contactForm = document.getElementById('contact-form');
    const toast = document.getElementById('form-toast');

    if (contactForm && toast) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent actual form submission for now

            // Basic HTML5 validation is handled by 'required' attributes.
            // If we reach here, the form is valid.

            // Show success toast
            toast.classList.remove('opacity-0', 'invisible', 'translate-y-[-20px]');
            toast.classList.add('opacity-100', 'visible', 'translate-y-0');

            // Reset form
            contactForm.reset();

            // Hide toast after 4 seconds
            setTimeout(() => {
                toast.classList.remove('opacity-100', 'visible', 'translate-y-0');
                toast.classList.add('opacity-0', 'invisible', 'translate-y-[-20px]');
            }, 4000);
        });
    }
});
