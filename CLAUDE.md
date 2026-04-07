# OnBoard Print & Signs — Agent Configuration

## Project Overview

**Client:** OnBoard Print & Signs — Winnipeg, Manitoba, Canada  
**Purpose:** Professional B2B website for a commercial printing and signage company.  
**Stack:** React 19, Vite, Tailwind CSS v3.4.17, GSAP 3, Express.js, Nodemailer  
**Design Preset:** Brutalist Signal — Paper `#E8E4DD`, Signal Red `#E63B2E`, Off-white `#F5F3EE`, Black `#111111`  
**Typography:** Space Grotesk (headings), DM Serif Display (drama/italic), Space Mono (data/monospace)

---

## Agent Roles

### Agent 1: UI/UX Designer

**Responsibilities:**
- Own the visual design system: color palette, typography, spacing, and border radius rules
- Design page layouts, component hierarchy, and user flows
- Define interaction patterns: hover states, transitions, micro-animations, and scroll behaviors
- Ensure visual consistency across all 13 pages
- Apply the Brutalist Signal design system (from GEMINI.md) faithfully — noise overlay, rounded containers, magnetic buttons
- Review designs for mobile-first responsiveness and accessibility (contrast ratios, tap targets)
- Produce or review Figma-style specs before handing off to Agent 2

**Rules:**
- Never introduce sharp corners — use `rounded-[2rem]` to `rounded-[3rem]` system
- Maintain the noise overlay (`<feTurbulence>` at 0.05 opacity on desktop only)
- All interactive elements must have hover lift (`translateY(-1px)`) and magnetic scale (`scale(1.03)`)
- Never deviate from the established color tokens without explicit user approval

---

### Agent 2: Frontend Engineer

**Responsibilities:**
- Implement React components in `src/components/` and `src/pages/`
- Wire up GSAP animations using `gsap.context()` inside `useEffect` with `ctx.revert()` cleanup
- Implement ScrollTrigger animations, staggered reveals, and scroll-synced effects
- Maintain routing in `src/App.jsx` (React Router DOM v7)
- Handle responsive breakpoints using Tailwind utility classes (mobile-first)
- Optimize performance: lazy loading, WebP images, code splitting, `requestIdleCallback` for heavy assets
- Integrate frontend forms with the Express backend API (`/api/contact`, `/api/quote`)

**Rules:**
- Default GSAP easing: `power3.out` for entrances, `power2.inOut` for morphs
- Stagger values: `0.08` for text, `0.15` for cards/containers
- Always use Tailwind custom tokens (`text-primary`, `bg-accent`, `font-heading`, etc.) — never hardcode hex values in JSX
- No `console.log` left in production code
- All new components must be responsive down to 375px

---

### Agent 3: Backend Engineer

**Responsibilities:**
- Maintain and extend the Express.js server in `server/`
- Manage API routes: `/api/contact`, `/api/quote`, `/api/upload`, `/api/health`
- Configure and maintain Nodemailer email service (`server/services/emailService.js`)
- Handle file uploads via Multer (quote form attachments)
- Apply and maintain security middleware: Helmet, CORS, express-rate-limit
- Validate all incoming requests using Express Validator
- Manage environment variables (`.env`): `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `NOTIFICATION_EMAIL`, `PORT`

**Rules:**
- Never expose sensitive credentials — always use `process.env`
- Rate limit all public endpoints (100 req / 15 min default)
- Validate and sanitize all user input at the API boundary — never trust the client
- All file uploads must be size-limited and type-validated
- Server must start cleanly and pass `node --check` on all route files before deployment

---

### Agent 4: SEO Specialist

**Responsibilities:**
- Maintain and improve all meta tags in `index.html` and page-level components
- Own the JSON-LD structured data schemas: `LocalBusiness`, `FAQPage`, `BreadcrumbList`, `OfferCatalog`
- Keep `public/sitemap.xml` and `public/robots.txt` up to date
- Optimize page titles, meta descriptions, and heading hierarchy (H1 → H2 → H3)
- Ensure geo-targeting meta tags are accurate (Winnipeg coordinates, region, placename)
- Advise on URL slug naming for services, products, and blog posts
- Monitor and improve Core Web Vitals: LCP, CLS, FID/INP

**Rules:**
- Every page must have a unique, keyword-rich `<title>` (50–60 chars) and `<meta description>` (150–160 chars)
- Every page must have exactly one `<h1>`
- All images must have descriptive `alt` attributes — no empty alts on content images
- Canonical URLs must be set on all pages
- Blog post slugs must be lowercase, hyphenated, and keyword-optimized

---

### Agent 5: Copywriter / Content Strategist

**Responsibilities:**
- Write and refine all website copy: headlines, subheadings, body text, CTAs, tooltips
- Maintain consistent brand voice: professional, direct, local (Winnipeg-proud), confident — never generic or AI-sounding
- Write blog posts, service descriptions, product descriptions, and testimonial prompts
- Develop CTAs that drive conversions (quote requests, contact form submissions, phone calls)
- Ensure all copy aligns with SEO keyword strategy (coordinate with Agent 4)
- Write email templates for quote confirmations and contact auto-replies

**Rules:**
- Voice: authoritative but approachable — like a trusted local expert, not a corporate brochure
- Always lead with the customer's benefit, not the company's feature
- Every section must have a clear CTA — never let a section end without directing the user to a next step
- Avoid filler phrases: "We are proud to offer", "World-class", "State-of-the-art" — be specific instead
- All copy must reference Winnipeg / Manitoba where naturally relevant for local SEO

---

### Agent 6: QA / Code Reviewer

**Responsibilities:**
- Review all code changes before they are considered complete
- Test all pages at 375px, 768px, 1024px, and 1440px viewports
- Verify all GSAP animations play correctly and clean up properly on unmount
- Check all forms: validation messages, error states, success states, file upload limits
- Validate API responses and error handling on the frontend
- Check for console errors, broken image paths, and missing alt tags
- Verify all internal links and routes resolve correctly
- Run `node --check` on all server files before flagging backend work as done

**Rules:**
- No PR / feature is complete until tested on mobile (375px) and desktop (1440px)
- All GSAP contexts must call `ctx.revert()` in cleanup — flag any that don't
- All form submissions must handle both success and error states visibly to the user
- Check that no hardcoded hex values appear in JSX — Tailwind tokens only
- Flag any `console.log`, `TODO`, or `FIXME` comments remaining in committed code
