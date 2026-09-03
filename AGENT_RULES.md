# Agent Instructions & Project Blueprint: Limpiezas Gaitán

You are the lead full-stack engineer and technical architect for this repository. Follow all Git workflows, coding standards, and architectural blueprints strictly.

---

## 1. Git Workflow & Best Practices

### Branching Strategy
- **Base Branches:**
  - `main`: Production-ready code only. Never commit directly to `main`.
  - `develop`: Integration branch for tested features.
- **Branch Naming Conventions:**
  - Format: `<type>/<issue-or-ticket-id>-<short-description>` (or `<type>/<short-description>`).
  - Feature: `feat/homepage-hero`, `feat/quote-calculator`
  - Fix: `fix/mobile-nav-overflow`, `fix/contact-form-validation`
  - Refactor: `refactor/service-card-component`
  - Style/Design: `style/footer-contrast-fix`
  - Docs: `docs/readme-setup`
- **Branch Rules:**
  - Always branch off the latest updated `develop` (or `main` if no develop branch exists).
  - Keep branches short-lived, focused on a single responsibility.
  - Delete feature branches immediately after merging.

### Commit Standards (Conventional Commits)
- Follow the [Conventional Commits](https://www.conventionalcommits.org/) standard strictly.
- **Format:** `<type>(<optional-scope>): <imperative description>`
  - Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`.
  - Example: `feat(contact): add interactive quote form with validation`
  - Example: `fix(seo): correct canonical tags on localized service routes`
- **Commit Granularity:**
  - Make small, atomic commits. Do not lump multiple unrelated features or fixes into one commit.
  - Never commit build artifacts (`dist/`, `build/`, `.next/`), local environments (`.env.local`), or `node_modules`.
  - Ensure the test suite passes and the project builds without errors before committing.

### Pull Requests & Merging
- Provide clear PR descriptions: What changed, why it changed, and how to manually verify.
- Rebase onto the target branch before merging to maintain a clean, linear git history whenever possible.

---

## 2. Project Architecture & Requirements

Build a modern, responsive, multi-page website for **Limpiezas Gaitán** (a professional cleaning company in Gipuzkoa, Spain), focusing on high conversions, local SEO, clean performance, and eco-friendly branding.

### Tech Stack & Design Rules
- **Framework:** Modern HTML5/Tailwind CSS or React/Next.js.
- **Icons & UI:** Lucide/Heroicons, fully responsive across mobile, tablet, and desktop.
- **Color Palette:** Clean white, soft slate/neutral gray, fresh eco-green accents, and deep navy/charcoal for text.
- **SEO & Schema:** Valid `LocalBusiness` JSON-LD structured data, proper Open Graph tags, canonical URLs, semantic HTML5 tags (`<main>`, `<nav>`, `<article>`), and native Spanish (`es-ES`) copy.
- **No E-commerce Residue:** Do not include shopping cart scripts, user account modals, or e-commerce boilerplate.

---

## 3. Site Structure & Page Blueprints

### Global Elements
- **Header & Navigation:**
  - Sticky navbar with logo placeholder, service dropdown, "Quiénes Somos", "Blog", and "Contacto".
  - High-visibility CTA button: *"Pedir Presupuesto"*.
  - Direct click-to-call links: `943 01 34 81` and `649 22 04 02`.
- **Footer:**
  - Contact information, business address (*Calle Morronguilleta 10, Errenteria, Gipuzkoa*), opening hours, WhatsApp chat link.
  - Legal links: RGPD-compliant Privacy Policy, Legal Notice, Cookie Policy banner.

### Pages to Implement
1. **Home (`/` or `index.html`):**
   - Hero: Strong value proposition (*"Servicios Profesionales de Limpieza en Gipuzkoa"*), 12+ years experience callout, eco-friendly certification badge (Ministry of Health / WHO approved ecological products), and primary quote CTA.
   - Core value points: Punctuality, certified staff, green products, insurance coverage.
   - Services Grid: Clean card overview linking to dedicated service routes.
   - Proof / Trust: Before-and-after slider placeholder, client testimonials, local coverage map.
   - Quick contact / quote request block.

2. **Quiénes Somos (`/quienes-somos`):**
   - Company history: Founded in Errenteria after 12+ years in the cleaning sector.
   - Environmental pledge: Safe, certified, ecological sanitization.
   - Safety, liability insurance, and team standards.

3. **Dedicated Service Pages (`/servicios/...`):**
   *Create modular, SEO-optimized templates for each with benefits, process breakdown, and an FAQ accordion:*
   - `/servicios/comunidades` (Residential staircases, entryways, community management)
   - `/servicios/domicilios` (Private residential, recurring domestic cleaning)
   - `/servicios/oficinas-empresas` (Commercial offices, shared workspaces)
   - `/servicios/hosteleria` (Restaurants, kitchens, degreasing, extraction hoods)
   - `/servicios/garajes` (Industrial parking floor scrubbing and maintenance)
   - `/servicios/limpieza-vapor` (Deep steam disinfection and sanitization)
   - `/servicios/fin-de-obra` (Deep move-in/move-out and post-construction cleanups)

4. **Blog / Tips (`/blog`):**
   - Scannable card grid for cleaning tips, hygiene regulations, and local maintenance guides.

5. **Contact & Presupuesto (`/contacto`):**
   - Detailed quote form: Name, Phone, Email, Service Type selector, Square meters ($m^2$), City/Address, and Message.
   - Google Maps iframe placeholder for Calle Morronguilleta 10, Errenteria.
   - Direct phone, email (`info@limpiezasgaitan.com`), and WhatsApp CTA.

6. **Legal & Compliance:**
   - `/aviso-legal`, `/politica-de-privacidad` (RGPD compliance), `/politica-de-cookies`.