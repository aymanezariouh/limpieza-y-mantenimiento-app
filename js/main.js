// main.js - ASI Etxeko Zerbitzuak

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isHidden = mobileMenu.classList.toggle('hidden');
            
            const icon = mobileMenuBtn.querySelector('i, svg');
            if (icon) {
                if (!isHidden) {
                    mobileMenuBtn.innerHTML = '<i data-lucide="x" class="w-7 h-7"></i>';
                } else {
                    mobileMenuBtn.innerHTML = '<i data-lucide="menu" class="w-7 h-7"></i>';
                }
                lucide.createIcons();
            }
        });

        // Close when clicking anywhere outside
        document.addEventListener('click', (e) => {
            if (!mobileMenu.classList.contains('hidden') && !mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                mobileMenu.classList.add('hidden');
                mobileMenuBtn.innerHTML = '<i data-lucide="menu" class="w-7 h-7"></i>';
                lucide.createIcons();
            }
        });

        // Close on link click inside mobile menu
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenuBtn.innerHTML = '<i data-lucide="menu" class="w-7 h-7"></i>';
                lucide.createIcons();
            });
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

    // 4. Contact Form -> Direct WhatsApp Submission
    function handleWhatsAppFormSubmit(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const nombreInput = form.querySelector('[name="nombre"], #nombre');
            const telefonoInput = form.querySelector('[name="telefono"], #telefono');
            const emailInput = form.querySelector('[name="email"], #email');
            const servicioInput = form.querySelector('[name="servicio"], #servicio');
            const mensajeInput = form.querySelector('[name="mensaje"], #mensaje');

            const nombre = nombreInput ? nombreInput.value.trim() : '';
            const telefono = telefonoInput ? telefonoInput.value.trim() : '';
            const email = emailInput ? emailInput.value.trim() : '';
            const servicioVal = servicioInput ? servicioInput.value : '';
            const mensaje = mensajeInput ? mensajeInput.value.trim() : '';

            const serviceNames = {
                'comunidades': 'Limpieza de Comunidades',
                'domicilios': 'Limpieza de Domicilios',
                'oficinas': 'Limpieza de Oficinas y Empresas',
                'hosteleria': 'Limpieza en Hostelería',
                'garajes': 'Limpieza de Garajes',
                'vapor': 'Limpieza con Vapor',
                'obra': 'Limpieza Fin de Obra'
            };
            const servicio = serviceNames[servicioVal] || servicioVal || 'Servicio General';

            let waText = `👋 *Hola ASI Etxeko Zerbitzuak*, me gustaría solicitar información / presupuesto:\n\n`;
            if (nombre) waText += `👤 *Nombre:* ${nombre}\n`;
            if (telefono) waText += `📞 *Teléfono:* ${telefono}\n`;
            if (email) waText += `✉️ *Email:* ${email}\n`;
            if (servicioVal) waText += `🧹 *Servicio:* ${servicio}\n`;
            if (mensaje) waText += `📝 *Detalles:* ${mensaje}\n`;

            const primaryPhone = '34627699411';
            const waUrl = `https://wa.me/${primaryPhone}?text=${encodeURIComponent(waText)}`;

            // Show toast if present
            const toast = document.getElementById('form-toast');
            if (toast) {
                toast.classList.remove('opacity-0', 'invisible', 'translate-y-[-20px]');
                toast.classList.add('opacity-100', 'visible', 'translate-y-0');
                setTimeout(() => {
                    toast.classList.remove('opacity-100', 'visible', 'translate-y-0');
                    toast.classList.add('opacity-0', 'invisible', 'translate-y-[-20px]');
                }, 4000);
            }

            // Open WhatsApp in new tab/app
            window.open(waUrl, '_blank');
            form.reset();
        });
    }

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        handleWhatsAppFormSubmit(contactForm);
    }

    // Attach to any other quote forms (e.g., homepage)
    document.querySelectorAll('form').forEach(f => {
        if (f !== contactForm && (f.querySelector('#telefono, input[type="tel"]') || f.querySelector('#nombre'))) {
            handleWhatsAppFormSubmit(f);
        }
    });

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

    // 7. WhatsApp Floating Button (injected on ALL pages)
    injectWhatsAppButton();
});


/**
 * Injects the WhatsApp floating button with dual-number popup into the page.
 */
function injectWhatsAppButton() {
    const whatsappSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>`;

    const html = `
    <div class="whatsapp-float" id="whatsapp-float">
        <button class="whatsapp-float-btn" id="whatsapp-toggle" aria-label="Contactar por WhatsApp">
            ${whatsappSVG}
        </button>
        <span class="whatsapp-tooltip">¡Escríbenos por WhatsApp!</span>
        
        <div class="whatsapp-popup" id="whatsapp-popup">
            <div class="whatsapp-popup-header">
                ${whatsappSVG}
                <span>¿A quién contactas?</span>
                <button class="whatsapp-popup-close" id="whatsapp-close" aria-label="Cerrar">&times;</button>
            </div>
            <a href="https://wa.me/34627699411?text=Hola%2C%20me%20gustar%C3%ADa%20solicitar%20informaci%C3%B3n%20sobre%20sus%20servicios%20de%20limpieza." target="_blank" rel="noopener noreferrer">
                ${whatsappSVG}
                <div>
                    <div class="wa-number">627 699 411</div>
                    <div style="font-size: 0.75rem; color: #64748b;">Línea principal</div>
                </div>
            </a>
            <a href="https://wa.me/34623119170?text=Hola%2C%20me%20gustar%C3%ADa%20solicitar%20informaci%C3%B3n%20sobre%20sus%20servicios%20de%20limpieza." target="_blank" rel="noopener noreferrer">
                ${whatsappSVG}
                <div>
                    <div class="wa-number">623 119 170</div>
                    <div style="font-size: 0.75rem; color: #64748b;">Línea alternativa</div>
                </div>
            </a>
        </div>
    </div>`;

    document.body.insertAdjacentHTML('beforeend', html);

    // Toggle popup
    const toggleBtn = document.getElementById('whatsapp-toggle');
    const popup = document.getElementById('whatsapp-popup');
    const closeBtn = document.getElementById('whatsapp-close');

    toggleBtn.addEventListener('click', () => {
        popup.classList.toggle('active');
    });

    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        popup.classList.remove('active');
    });

    // Close popup when clicking outside
    document.addEventListener('click', (e) => {
        const floatEl = document.getElementById('whatsapp-float');
        if (floatEl && !floatEl.contains(e.target)) {
            popup.classList.remove('active');
        }
    });
}
