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

    // 5. Contact Form URL Pre-fill
    const urlParams = new URLSearchParams(window.location.search);
    const servicioParam = urlParams.get('servicio');
    const servicioSelect = document.getElementById('servicio');

    if (servicioParam && servicioSelect) {
        // Map common params to the dropdown values just in case they don't match 1:1, 
        // though our links match the option values (comunidades, domicilios, oficinas, hosteleria, garajes, vapor, obra)
        const validOptions = Array.from(servicioSelect.options).map(opt => opt.value);
        if (validOptions.includes(servicioParam)) {
            servicioSelect.value = servicioParam;
        }
    }

    // 6. Cookie Consent Banner
    if (!localStorage.getItem('cookie_consent')) {
        const bannerHTML = `
            <div id="cookie-banner" class="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-2xl z-[100] p-4 md:p-6 transition-transform duration-500 transform translate-y-full">
                <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <div class="text-sm text-gray-600 flex-1">
                        Utilizamos cookies propias y de terceros para mejorar nuestros servicios y mostrarle publicidad relacionada con sus preferencias mediante el análisis de sus hábitos de navegación. Si continúa navegando, consideramos que acepta su uso. Puede obtener más información, o bien conocer cómo cambiar la configuración, en nuestra <a href="/politica-de-cookies.html" class="text-brand-teal hover:underline font-bold">Política de Cookies</a>.
                    </div>
                    <div class="flex gap-3 w-full md:w-auto justify-end">
                        <a href="/politica-de-cookies.html" class="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium text-sm hover:bg-gray-50 transition-colors whitespace-nowrap text-center">Configurar</a>
                        <button id="accept-cookies" class="px-5 py-2.5 rounded-lg bg-brand-dark text-white font-bold text-sm hover:bg-gray-800 transition-colors whitespace-nowrap shadow-md">Aceptar Todas</button>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', bannerHTML);
        
        const banner = document.getElementById('cookie-banner');
        const acceptBtn = document.getElementById('accept-cookies');
        
        // Slight delay to animate it sliding up
        setTimeout(() => {
            banner.classList.remove('translate-y-full');
        }, 500);

        acceptBtn.addEventListener('click', () => {
            localStorage.setItem('cookie_consent', 'accepted');
            banner.classList.add('translate-y-full');
            setTimeout(() => banner.remove(), 500); // Remove from DOM after animation
        });
    }
});
