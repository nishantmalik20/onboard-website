import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ChevronDown, ChevronRight, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ─── FAQ accordion ─── */
function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b" style={{ borderColor: '#E8E4DD20' }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-5 text-left bg-transparent border-none cursor-pointer">
        <span className="font-heading font-semibold text-base" style={{ color: '#F5F3EE' }}>{q}</span>
        <ChevronDown size={18} className="flex-shrink-0 ml-4 transition-transform duration-300" style={{ color: '#E63B2E', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }} />
      </button>
      <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: open ? '300px' : '0px' }}>
        <p className="font-heading text-sm leading-relaxed pb-5" style={{ color: '#E8E4DD88' }}>{a}</p>
      </div>
    </div>
  );
}

/* ─── Breadcrumb ─── */
function Breadcrumbs({ current }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-heading mb-6 flex-wrap" style={{ color: '#E8E4DD66' }}>
      <Link to="/" className="hover:underline" style={{ color: '#E8E4DD66' }}>Home</Link>
      <ChevronRight size={12} />
      <Link to="/blog" className="hover:underline" style={{ color: '#E8E4DD66' }}>Blog</Link>
      <ChevronRight size={12} />
      <span style={{ color: '#E8E4DDaa' }}>{current}</span>
    </nav>
  );
}

/* ─── Internal link helper ─── */
function IL({ to, children }) {
  return <Link to={to} className="font-semibold underline decoration-accent/40 hover:decoration-accent transition-colors" style={{ color: '#E63B2E' }}>{children}</Link>;
}

/* ─── Blog post data ─── */
const posts = {
  'led-channel-letter-sign-cost-winnipeg': {
    title: 'How Much Does an LED Channel Letter Sign Cost in Winnipeg?',
    metaTitle: 'How Much Does an LED Channel Letter Sign Cost in Winnipeg? (2025 Guide)',
    metaDesc: 'LED channel letter sign costs in Winnipeg range from $5,000–$15,000+ depending on size, lighting, and installation. This guide breaks down every cost factor — no surprises.',
    category: 'Signs',
    date: 'March 15, 2025',
    readTime: '6 min read',
    heroImage: { src: '/image-assets/website_storefront.webp', alt: 'Custom LED channel letter sign illuminated on a Winnipeg storefront at night — OnBoard Print & Signs' },
    content: [
      { type: 'p', text: 'If you\'re a Winnipeg business owner researching LED channel letter signs, the first question you\'ll Google is: how much does it cost? The honest answer is: it depends — but not in the vague, frustrating way most sign companies say that. In this guide, we\'re going to break down every real cost factor, give you actual price ranges for the Winnipeg market, and tell you what questions to ask before you sign any quote.' },
      { type: 'p', text: 'The short version: a standard LED channel letter sign installed on a Winnipeg storefront typically costs between $5,000 and $12,000, with complex or large installations running higher. Here\'s what drives that number — and what to watch out for.' },
      { type: 'h2', text: 'What Are LED Channel Letter Signs?' },
      { type: 'p', text: 'LED channel letter signs are three-dimensional, individually fabricated letters — the kind you see on retail storefronts, restaurant facades, and shopping plaza tenants. Each letter is hollow and internally illuminated by LED modules, making them visible in full daylight and from a distance after dark. They come in three main styles:' },
      { type: 'bullets', items: [
        { bold: 'Front-lit', text: 'LEDs light the coloured acrylic face. The most common, highest visibility' },
        { bold: 'Back-lit (Halo-lit)', text: 'LEDs project light onto the wall behind the letters, creating a glowing halo effect. More architectural, preferred for premium brands' },
        { bold: 'Combo-lit', text: 'Front and back illumination combined. Maximum impact, higher cost' },
      ]},
      { type: 'h2', text: 'What Factors Affect the Price of Channel Letters in Winnipeg?' },
      { type: 'h3', text: '1. Size of the Letters and Overall Sign' },
      { type: 'p', text: 'The single biggest cost driver. A 24" letter costs roughly 2–3x more to fabricate than a 12" letter — it requires more aluminum, more acrylic, more LED modules, and more wiring. The total width of the sign matters too: a 20-letter sign that spans 15 feet has a very different cost profile than a 6-letter sign at 4 feet.' },
      { type: 'h3', text: '2. Illumination Type' },
      { type: 'p', text: 'Front-lit letters are the most affordable. Halo-lit and combo-lit require polycarbonate backs instead of aluminum and additional electrical complexity — expect to add $500–$2,000 to the base price depending on sign size.' },
      { type: 'h3', text: '3. Colour and Acrylic Specification' },
      { type: 'p', text: 'Standard white acrylic faces are the baseline. Custom coloured acrylic matched to your Pantone brand colour, specialty translucent films, or colour-shift vinyl overlays all add cost — but in most cases, the premium is worth it for brand-accurate signage.' },
      { type: 'h3', text: '4. Fabrication — In-House vs. Outsourced' },
      { type: 'p', text: 'This is where quotes from different Winnipeg sign companies can vary significantly. Some shops outsource fabrication to third-party manufacturers and mark up the price. In-house fabrication (which we do at OnBoard) gives you more control over quality, faster timelines, and no middleman markup. When you\'re getting quotes, ask directly: do you fabricate in-house?' },
      { type: 'h3', text: '5. Permits' },
      { type: 'p-link', text: 'Every channel letter sign installed on a commercial building in Winnipeg requires a city sign permit. Permit fees vary based on sign size and value, but budget $300–$800 for the permit itself. Add another $500–$1,000 for the preparation of permit drawings and coordinating with the city — or ask whether your sign company includes this in the quote (we do). Learn more about our ', linkText: 'permit services', linkTo: '/services/permits-winnipeg', after: '.' },
      { type: 'h3', text: '6. Electrical Hookup' },
      { type: 'p', text: 'This is the most commonly hidden cost in sign quotes — and one of our biggest frustrations with the industry. The sign fabrication and the electrical connection are two different things. Many sign companies quote you for the sign but exclude the electrical hookup. You find out on installation day when the sign goes up and doesn\'t light up. Always ask: does your quote include the electrical connection? At OnBoard, it does.' },
      { type: 'h3', text: '7. Installation' },
      { type: 'p-link', text: 'Installation costs depend on: building height, building material, and whether a bucket truck or special equipment is needed. Typical ground-floor installations in Winnipeg range from $500–$2,000 for the installation labour alone. See our full ', linkText: 'installation & maintenance services', linkTo: '/services/installation-maintenance-winnipeg', after: '.' },
      { type: 'h2', text: 'Real Price Ranges for Winnipeg Channel Letter Signs' },
      { type: 'table', rows: [
        ['Sign Type', 'Approximate Cost Range (CAD)'],
        ['Small front-lit sign (6–8 letters, 12–18" tall)', '$3,500–$6,000'],
        ['Standard storefront sign (8–15 letters, 18–24" tall)', '$6,000–$10,000'],
        ['Large or complex sign (15+ letters, 24"+ tall, halo-lit)', '$10,000–$15,000+'],
        ['Multi-sign installation (e.g. plaza tenant with side signs)', 'Custom quote'],
      ]},
      { type: 'p', text: 'Note: These ranges reflect the Winnipeg market in 2025. Prices vary based on material costs, design complexity, and installation conditions. Always get an itemized quote.' },
      { type: 'image', src: 'https://images.unsplash.com/photo-1728104435729-6e7ece4d92e3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Close-up of LED channel letter sign fabrication — aluminum returns and acrylic faces assembled in a Winnipeg sign shop' },
      { type: 'h2', text: "What's NOT Included in a Lot of Winnipeg Sign Quotes" },
      { type: 'p', text: 'Before you accept any quote, make sure you have clear answers to these questions:' },
      { type: 'list', items: ['Is city permit preparation included?', 'Is the electrical hookup and connection included?', 'Is installation included, or is it quoted separately?', 'Are UL-certified LED components used? (Required for commercial installations)', 'Is WCB coverage included for installation workers?'] },
      { type: 'p-link', text: 'At OnBoard Print & Signs, our quotes include fabrication, permit drawings, UL-certified components, and installation. We give you one number. Browse our ', linkText: 'LED channel letter signs', linkTo: '/products/led-channel-letter-signs-winnipeg', after: ' to learn more.' },
      { type: 'h2', text: 'Is a Channel Letter Sign Worth the Investment?' },
      { type: 'p', text: 'For most retail and commercial businesses in Winnipeg, yes — and the numbers support it. A well-made channel letter sign typically lasts 10+ years with LED modules rated for 50,000+ hours. That\'s roughly $500–$1,000 per year of amortized signage cost for a storefront that\'s working for you 24 hours a day.' },
      { type: 'p', text: 'Consider the alternative: a Winnipeg billboard rental runs $2,000–$5,000 per month. A channel letter sign at $8,000 installed costs the same as 2–3 months of billboard rental — and it keeps working for a decade.' },
      { type: 'h2', text: 'How to Get an Accurate Quote' },
      { type: 'list', items: [
        'Measure your fascia (the area above your storefront where the sign will mount) — width and height',
        'Know your brand colours (Pantone or CMYK values if possible)',
        'Have your logo in vector format (AI or EPS) if possible',
        'Ask your property manager or landlord for any signage restrictions or guidelines for the property',
        'Contact us — we\'ll come out for a site visit, review the building, and give you an itemized quote with no hidden electrical surprises',
      ]},
    ],
    faqs: [
      { q: 'Do I need a permit for a channel letter sign in Winnipeg?', a: 'Yes. All exterior commercial signs in Winnipeg require a city sign permit. We handle the entire permit process.' },
      { q: 'How long does it take to get a channel letter sign made and installed?', a: 'Typically 3–6 weeks from approved design to installation, including permit processing time.' },
      { q: 'Can I get channel letters that match my exact brand colours?', a: 'Yes. We colour-match acrylic faces and vinyl overlays to your Pantone or CMYK specifications.' },
      { q: 'What if my quote doesn\'t include electrical?', a: 'Ask specifically before accepting. At OnBoard, electrical is always included. It\'s non-negotiable for us.' },
    ],
    relatedSlugs: ['vehicle-wraps-vs-billboards-winnipeg', 'sign-permit-guide-winnipeg'],
  },

  'vehicle-wraps-vs-billboards-winnipeg': {
    title: 'Vehicle Wraps vs. Billboards: Which Gives Winnipeg Businesses Better ROI?',
    metaTitle: 'Vehicle Wraps vs. Billboards: Which Gives Winnipeg Businesses Better ROI?',
    metaDesc: 'A wrapped van generates up to 70,000 impressions daily at a fraction of billboard cost. Here\'s the real ROI comparison for Winnipeg business owners — with the numbers.',
    category: 'Vehicle Wraps',
    date: 'March 8, 2025',
    readTime: '5 min read',
    heroImage: { src: 'https://images.unsplash.com/photo-1732690113224-e4230dd9a549?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Branded vehicle wrap on a commercial van — mobile advertising for Winnipeg businesses' },
    content: [
      { type: 'p', text: 'If you\'re a small or medium business owner in Winnipeg trying to stretch your advertising budget, you\'ve probably looked at two of the most visible local options: a billboard on a major route, or a vehicle wrap on your company truck. Both put your brand in front of people. But the cost difference — and the return — is dramatic. Let\'s look at the real numbers.' },
      { type: 'h2', text: 'The Cost Comparison' },
      { type: 'table', rows: [
        ['Advertising Type', 'Cost', 'Duration', 'Monthly Cost'],
        ['Winnipeg billboard (prime location)', '$2,000–$5,000/month', 'Ongoing (monthly fee)', '$2,000–$5,000'],
        ['Full vehicle wrap (professional, cast vinyl)', '$3,500–$5,500 (one-time)', '5–7 years', '$50–$90'],
      ]},
      { type: 'p', text: 'A vehicle wrap amortized over 5 years costs roughly $55–$90 per month. A billboard costs 25–90x more — every single month, forever, with no residual value when you stop paying.' },
      { type: 'h2', text: 'The Impression Numbers' },
      { type: 'p', text: 'The Outdoor Advertising Association of America (OAAA) data shows wrapped vehicles deliver a CPM (cost per 1,000 impressions) of $0.48–$0.77. Billboards average $3.56 CPM. Transit ads run $7.45 CPM. Newspapers? $19.70 CPM.' },
      { type: 'p', text: 'A single wrapped commercial vehicle driving Winnipeg routes generates 30,000–70,000 impressions per day — depending on which routes it travels. Over a 5-year lifespan, that\'s tens of millions of eyeballs for a one-time investment.' },
      { type: 'h2', text: 'Winnipeg-Specific Advantages of Vehicle Wraps' },
      { type: 'list', items: [
        'Route flexibility — A billboard is anchored to one location. A wrapped van working service routes through Transcona, St. Vital, River Heights, and the North End is reaching every neighbourhood your business serves',
        'Trades and service businesses — If your crew drives to job sites, your vehicles are already on the road. Wrapping them turns every service call into an advertising run',
        'No ongoing costs — Once installed, a quality wrap requires no monthly payment. It just works',
        'Brand consistency — Every wrapped vehicle in your fleet presents an identical, professional brand image',
      ]},
      { type: 'h2', text: 'When a Billboard Makes More Sense' },
      { type: 'p', text: 'Billboards still have a place — particularly for businesses that need high-frequency exposure at a specific, high-traffic location (think a new restaurant near a highway interchange), for seasonal campaigns with a defined end date, or for brand-awareness campaigns where saturation at one location is the goal. But for most Winnipeg small and medium businesses — trades, retail, service companies, food businesses — vehicle wraps deliver significantly more value per dollar.' },
      { type: 'image', src: '/image-assets/vehicle_graphics_3.webp', alt: 'Vehicle wrap installation — professional vinyl wrap applied to a commercial vehicle in Winnipeg' },
      { type: 'h2', text: 'What Makes a Vehicle Wrap Actually Work?' },
      { type: 'p-link', text: 'The quality of the design matters as much as the installation. A wrap with your phone number, logo, and 3 words of what you do — bold, readable at 60km/h — outperforms a cluttered wrap with fine print and paragraph text every time. When we design wraps at OnBoard, we design for the two-second glance. See our full ', linkText: 'vehicle wrap services', linkTo: '/products/vehicle-wraps-winnipeg', after: '.' },
    ],
    faqs: [
      { q: 'How long does a vehicle wrap last in Winnipeg\'s climate?', a: 'Quality cast vinyl wraps last 5–7 years. Manitoba winters are hard on vehicles but not on properly installed vinyl — the bigger enemies are UV exposure (summer sun) and automatic car washes with harsh brushes. Hand washing extends wrap life significantly.' },
      { q: 'Can I wrap a leased vehicle?', a: 'Yes. Most lease agreements allow vinyl wraps. When professionally installed and removed, quality vinyl does not damage factory paint — it actually protects it.' },
      { q: 'Do I need to wrap the whole vehicle?', a: 'No. Partial wraps (door panels, tailgate, hood) and spot graphics are valid, lower-cost options that still generate brand exposure.' },
    ],
    relatedSlugs: ['how-to-choose-vehicle-wrap-vinyl-winnipeg', 'led-channel-letter-sign-cost-winnipeg'],
  },

  'sign-permit-guide-winnipeg': {
    title: 'The Complete Guide to Getting a Sign Permit in Winnipeg',
    metaTitle: 'The Complete Guide to Getting a Sign Permit in Winnipeg (2025)',
    metaDesc: 'Most Winnipeg businesses need a permit before installing any exterior sign. This guide explains who needs one, what\'s required, and how OnBoard handles the entire process for you.',
    category: 'Permits',
    date: 'February 28, 2025',
    readTime: '5 min read',
    heroImage: { src: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&q=80&auto=format&fit=crop', alt: 'Sign permit application documents and drawings prepared for City of Winnipeg submission' },
    content: [
      { type: 'p', text: 'One of the most common mistakes Winnipeg businesses make when ordering a new sign is skipping the permit — or not knowing they need one. A sign installed without the proper permit can result in a city order to remove or alter the sign, fines, and complications when you renew your business licence or sell your property. This guide explains what the City of Winnipeg requires, who needs a permit, and why working with a sign company that handles permits in-house matters more than most business owners realize.' },
      { type: 'h2', text: 'Do You Need a Sign Permit in Winnipeg?' },
      { type: 'p', text: 'In most cases, yes. The City of Winnipeg requires a sign permit for:' },
      { type: 'list', items: ['Any new exterior sign attached to a building or property', 'Alterations to existing exterior signage (changing copy, resizing, re-illuminating)', 'Free-standing signs and pylon signs', 'Illuminated signs of any type'] },
      { type: 'p', text: 'Signs that typically do NOT require a permit: small temporary signs (within size limits), window graphics that don\'t exceed a certain percentage of window coverage, and some directional/wayfinding signs. The City\'s sign bylaw is the definitive source — and it changes periodically.' },
      { type: 'h2', text: 'What Does the Sign Bylaw Cover?' },
      { type: 'p', text: 'Winnipeg\'s sign bylaw regulates:' },
      { type: 'list', items: ['Maximum sign area (based on building frontage and zone type)', 'Maximum height of signs', 'Setback requirements from property lines and roads', 'Illumination restrictions (brightness, direction, hours of operation in some zones)', 'Restrictions on projecting signs, roof signs, and animated signs', 'Neighbourhood-specific design standards in heritage and character zones'] },
      { type: 'p', text: 'Plaza tenants have additional requirements: your landlord or property manager will have a signage schedule that specifies maximum dimensions, permitted mounting methods, and sometimes required sign types. Always get this document before ordering your sign.' },
      { type: 'h2', text: "What's Required to Apply for a Sign Permit?" },
      { type: 'p', text: 'A standard sign permit application to the City of Winnipeg typically requires:' },
      { type: 'list', items: ['Completed permit application form', 'Site plan showing sign location on the building/property', 'Sign drawings showing dimensions, materials, and mounting details', 'Electrical drawings (for illuminated signs) — must meet Manitoba Electrical Code standards', 'UL certification documentation for LED components (for illuminated signs)', 'Structural calculations (for large or projecting signs)', 'Property owner consent if you\'re a tenant'] },
      { type: 'image', src: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=1600&q=80&auto=format&fit=crop', alt: 'Permit-ready sign drawings prepared for city submission — dimensioned elevation and site plan' },
      { type: 'h2', text: 'How Long Does a Sign Permit Take in Winnipeg?' },
      { type: 'p', text: 'Residential and straightforward commercial permits are often approved in 2–4 weeks. Larger signs, heritage zones, or signs requiring variances can take 6–10 weeks or more. Plan your sign project with the permit timeline in mind — order your sign after permit approval or at the same time, not before.' },
      { type: 'h2', text: 'What Happens If You Install Without a Permit?' },
      { type: 'p', text: 'The City of Winnipeg enforces its sign bylaw through inspections and complaints. If your sign is identified as unpermitted:' },
      { type: 'list', items: ['You may receive an order to remove or alter the sign at your own cost', 'Fines can be issued for bylaw violations', 'Insurance claims related to the sign may be denied if the sign was not permitted', 'Property sale and lease transactions can be complicated by unpermitted signage'] },
      { type: 'p', text: 'Some sign companies will install without permits if you ask — and frame it as saving you money. It\'s not saving you money. It\'s transferring legal risk to you.' },
      { type: 'h2', text: 'How OnBoard Handles Permits' },
      { type: 'p-link', text: 'We manage the entire permit process in-house. See our full ', linkText: 'permit services page', linkTo: '/services/permits-winnipeg', after: ' for details. Here\'s what\'s included:' },
      { type: 'list', items: ['Review your specific property\'s sign bylaw allowances and any plaza-specific guidelines', 'Prepare permit drawings and electrical documentation', 'Submit the application to the City on your behalf', 'Coordinate with city staff and inspectors during review', 'Track progress and handle any revision requests', 'Notify you when approval is granted before scheduling installation'] },
      { type: 'p', text: 'Permit handling is included in our project quotes — it\'s not an afterthought add-on.' },
    ],
    faqs: [
      { q: 'Can I apply for a sign permit myself?', a: 'Yes, technically. But the permit drawings require professional documentation, electrical calculations, and UL certification references that most businesses don\'t have. Most applicants working without a sign company end up paying for revisions and resubmissions.' },
      { q: 'Does my landlord need to be involved?', a: 'You\'ll typically need written consent from your landlord or property manager confirming they\'ve approved the sign design and location.' },
      { q: 'What if I\'m in a historic or character zone in Winnipeg?', a: 'Some Winnipeg neighbourhoods have additional design review requirements. We\'re familiar with these zones and will flag any additional steps upfront.' },
    ],
    relatedSlugs: ['led-channel-letter-sign-cost-winnipeg', 'new-business-signage-checklist-winnipeg'],
  },

  'new-business-signage-checklist-winnipeg': {
    title: 'Opening a New Business in Winnipeg? Your Complete Signage Checklist',
    metaTitle: 'Opening a New Business in Winnipeg? Your Complete Signage Checklist',
    metaDesc: 'Everything a new Winnipeg business needs to think about for signage — from storefront signs and vehicle wraps to permits, timelines, and budget planning. A practical checklist.',
    category: 'Business Tips',
    date: 'February 20, 2025',
    readTime: '6 min read',
    heroImage: { src: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1600&q=80&auto=format&fit=crop', alt: 'New business storefront with fresh exterior signage ready for opening day in Winnipeg' },
    content: [
      { type: 'p', text: 'Opening a new business in Winnipeg is exciting — and hectic. Signage is one of those things that gets pushed to the last minute, then becomes urgent two weeks before opening day. The problem: sign fabrication, permits, and installation take time. A lot of businesses open without proper signage because they didn\'t build it into the timeline early enough. This checklist helps you avoid that.' },
      { type: 'h2', text: 'Step 1 — Talk to Your Landlord or Property Manager' },
      { type: 'p', text: 'If you\'re leasing a commercial space, your landlord has a signage schedule. This document defines maximum sign dimensions, permitted sign types, mounting method requirements, and the approval process. Get this document before you do anything else. A sign designed without it might need to be redesigned entirely — which wastes time and money.' },
      { type: 'h2', text: 'Step 2 — Plan Your Signage Budget Early' },
      { type: 'p', text: 'Signage is an investment, not a purchase. Here\'s a rough budget framework for a new Winnipeg retail or service business:' },
      { type: 'table', rows: [
        ['Sign Type', 'Typical Budget Range (CAD)'],
        ['Exterior LED channel letter sign (installed)', '$5,000–$12,000'],
        ['Vehicle wrap (1 vehicle, cast vinyl)', '$3,500–$5,500'],
        ['Window graphics', '$500–$2,500'],
        ['Interior branded wall or wallpaper', '$2,000–$8,000'],
        ['Business cards & flyers (opening run)', '$300–$800'],
        ['Yard signs (grand opening)', '$150–$500'],
      ]},
      { type: 'p', text: 'Most new retail businesses allocate 2–5% of their first-year operating budget to signage. Think of it as one-time infrastructure, not an expense.' },
      { type: 'h2', text: 'Step 3 — Know Your Timeline' },
      { type: 'p', text: 'Signage takes longer than most people expect. Here are realistic timelines:' },
      { type: 'list', items: [
        'Business cards and flyers: 2–5 business days (same-day available for rush)',
        'Yard signs and window graphics: 3–7 business days',
        'Vehicle wraps: 1–2 weeks (design + production + installation)',
        'LED channel letter sign: 4–8 weeks (design → permit → fabrication → install)',
      ]},
      { type: 'p-link', text: 'The permit process for exterior signs often takes 2–4 weeks on its own. See our ', linkText: 'permit guide', linkTo: '/services/permits-winnipeg', after: ' for details. Build signage lead time into your opening plan — not as an afterthought.' },
      { type: 'image', src: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1600&q=80&auto=format&fit=crop', alt: 'Business planning calendar showing signage timeline for a new Winnipeg business opening' },
      { type: 'h2', text: 'Step 4 — Prioritize Your Opening Day Signage' },
      { type: 'p', text: 'You don\'t need everything on opening day. Here\'s what actually matters first:' },
      { type: 'list', items: [
        'Storefront identification — Some form of exterior signage so people know you\'re there. Even temporary vinyl or a banner is better than nothing while your channel letters are being fabricated',
        'Window graphics — Great for announcing your opening, services, and hours without waiting for a sign permit',
        'Business cards — You\'ll be handing these out at your opening event, to suppliers, and to early customers',
        'Grand opening yard signs — High-visibility, fast to produce, effective at driving foot traffic in the first 2 weeks',
      ]},
      { type: 'h2', text: 'Step 5 — Think About the Full Brand Picture' },
      { type: 'p-link', text: 'Your channel letter sign, your vehicle wrap, your window graphics, your business cards, and your website should all feel like they came from the same brand. Inconsistency across touchpoints weakens the impression you\'re making. Browse our ', linkText: 'products', linkTo: '/products', after: ' to see the full range we offer — all under one roof.' },
      { type: 'h2', text: 'Step 6 — Don\'t Skip the Permit' },
      { type: 'p-link', text: 'We\'ve covered this in detail in our ', linkText: 'permit guide', linkTo: '/blog/sign-permit-guide-winnipeg', after: ', but it bears repeating: no exterior sign should go up without a city permit. Schedule the permit application as soon as your sign design is approved — before fabrication if possible. We handle this for you.' },
      { type: 'h2', text: 'The Opening Day Signage Checklist' },
      { type: 'checklist', items: [
        'Obtained landlord signage schedule',
        'Confirmed brand colours in Pantone/CMYK',
        'Logo available in vector format (AI or EPS)',
        'Sign location measured (width x height of fascia)',
        'Signage budget established',
        'Contacted sign company for consultation',
        'Begun design and approval process',
        'Submitted permit application for exterior sign',
        'Business cards and flyers ordered',
        'Window graphics ordered',
        'Grand opening yard signs ordered',
        'Vehicle wrap in production (if applicable)',
        'Temporary storefront signage in place',
        'Window graphics installed',
        'Business cards and flyers in hand',
        'LED channel letter sign installed (when permit clears)',
      ]},
    ],
    faqs: [
      { q: 'Can you rush a channel letter sign for an opening?', a: 'The fabrication can sometimes be expedited, but the permit timeline is controlled by the city. We can\'t speed up the permit. What we can do is get temporary signage up for your opening while the channel letters are in production.' },
      { q: 'Do I need a sign for the inside of my business too?', a: 'Interior signage (wall murals, directional signs, branded graphics) doesn\'t require a city permit and can be produced and installed quickly. It also makes a strong impression on customers walking through the door.' },
    ],
    relatedSlugs: ['led-channel-letter-sign-cost-winnipeg', 'sign-permit-guide-winnipeg'],
  },

  'custom-wallpaper-vs-paint-winnipeg-commercial': {
    title: 'Custom Wallpaper vs. Paint: Why Winnipeg Businesses Are Choosing Wall Murals',
    metaTitle: 'Custom Wallpaper vs. Paint: Why Winnipeg Businesses Are Choosing Wall Murals',
    metaDesc: 'More Winnipeg restaurants, offices, and retailers are replacing paint with custom commercial wallpaper. Here\'s why — and what it actually costs compared to a paint job.',
    category: 'Print',
    date: 'February 12, 2025',
    readTime: '5 min read',
    heroImage: { src: 'https://images.unsplash.com/photo-1627815416399-ddaae0e2fa54?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Custom commercial wallpaper installed in a restaurant interior — branded wall mural in Winnipeg' },
    content: [
      { type: 'p', text: 'A few years ago, if a Winnipeg restaurant or retail business wanted to make an impression with their walls, they painted. Maybe a feature wall in their brand colour. Maybe a local artist\'s mural if they had the right connections and budget. Today, there\'s a better option — and most of the businesses we\'ve installed custom wallpaper for say it was one of the best brand decisions they made. Here\'s the honest comparison.' },
      { type: 'h2', text: 'What Is Commercial Custom Wallpaper?' },
      { type: 'p', text: 'Commercial custom wallpaper (also called wall murals or wallcoverings) is high-resolution, large-format print applied to your walls as panels. It can be your brand\'s custom illustration, a scaled-up logo or brand pattern, a photographic image, a typography-based design, or anything your design team can produce at high resolution. The result is a wall that looks intentional, unique, and completely on-brand.' },
      { type: 'h2', text: 'Custom Wallpaper vs. Paint — The Real Comparison' },
      { type: 'table', rows: [
        ['Factor', 'Paint', 'Custom Wallpaper'],
        ['Brand accuracy', 'Limited — colour chips approximate', 'Exact — printed to your Pantone/CMYK specs'],
        ['Uniqueness', 'Generic — any competitor can repaint the same colour', 'Unique — your exact design, nobody else has it'],
        ['Complexity', 'Limited to flat colour or simple shapes', 'Unlimited — photo-realistic, illustrated, typographic'],
        ['Durability', 'Chips, fades, marks over time', 'UV-coated commercial grade — scrubbable, long-lasting'],
        ['Cost', '$500–$3,000 for a feature wall', '$2,000–$8,000 for a feature wall'],
      ]},
      { type: 'h2', text: 'Is Custom Wallpaper Worth the Higher Cost?' },
      { type: 'p', text: 'For a brand-driven business — a café, restaurant, retail shop, office reception area, or any space where customers form an impression — yes. Paint gives you a colour. Wallpaper gives you a brand story. A customer who walks into a space with a stunning, intentional wall mural remembers it. It becomes something they photograph and share on social media. It becomes part of your identity as a business.' },
      { type: 'image', src: '/image-assets/wall_papers_onb.webp', alt: 'OnBoard Print & Signs custom wallpaper installation — floor-to-ceiling wall mural in a Winnipeg commercial space' },
      { type: 'h2', text: 'What Does Custom Commercial Wallpaper Cost in Winnipeg?' },
      { type: 'table', rows: [
        ['Wall Size', 'Approximate Cost Range (CAD)'],
        ['Small accent wall (up to 10 ft wide × 9 ft tall)', '$1,500–$3,500'],
        ['Feature wall (10–20 ft wide × 9–12 ft tall)', '$3,000–$6,000'],
        ['Large or full-room installation', '$5,000–$15,000+'],
      ]},
      { type: 'p-link', text: 'These ranges include design, printing, and professional installation. See our ', linkText: 'custom wallpaper services', linkTo: '/products/custom-wallpaper-winnipeg', after: ' for full details on materials and process.' },
      { type: 'h2', text: 'The UV Coating Question' },
      { type: 'p', text: 'Always ask whether UV coating is included. UV-coated commercial wallpaper is significantly more durable and easy to clean — essential for restaurants, cafés, and any high-traffic space. An uncoated installation in a busy environment will show wear within a year or two. A properly UV-coated installation in a restaurant can look pristine for 5–10 years. We include UV coating recommendations in every wallpaper quote.' },
    ],
    faqs: [
      { q: 'Can you match my brand\'s exact colours in the wallpaper?', a: 'Yes. We use colour management and proofing systems to match your Pantone or CMYK specs before printing. You approve a proof before the full print run.' },
      { q: 'What wall conditions do you need?', a: 'Walls should be clean, smooth, and dry. We assess the wall condition before installation and will advise on any prep work needed.' },
      { q: 'How long does installation take?', a: 'A standard feature wall can typically be installed in half a day to a full day, depending on dimensions and complexity.' },
    ],
    relatedSlugs: ['new-business-signage-checklist-winnipeg', 'same-day-printing-winnipeg-guide'],
  },

  'how-to-choose-vehicle-wrap-vinyl-winnipeg': {
    title: 'Cast vs. Calendared Vinyl: How to Choose the Right Vehicle Wrap Material in Winnipeg',
    metaTitle: 'Cast vs. Calendared Vinyl: How to Choose the Right Vehicle Wrap Material',
    metaDesc: 'Cast vinyl and calendared vinyl are not the same thing. Using the wrong one is the most common vehicle wrap mistake. Here\'s how to choose for Winnipeg climate and your vehicle type.',
    category: 'Vehicle Wraps',
    date: 'February 5, 2025',
    readTime: '4 min read',
    heroImage: { src: 'https://images.unsplash.com/photo-1632605157148-6313421c504b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Cast vs calendared vinyl vehicle wrap — choosing the right material for Winnipeg climate and vehicle type' },
    content: [
      { type: 'p', text: 'Not all vehicle wrap vinyl is the same — and using the wrong type is one of the most common mistakes made by shops that cut corners. If someone gives you a quote for a vehicle wrap without mentioning vinyl type, ask. The difference in material affects how the wrap performs on your specific vehicle, how long it lasts in Manitoba\'s climate, and ultimately whether you get a premium result or a wrap that starts peeling in year two.' },
      { type: 'h2', text: 'What Is Cast Vinyl?' },
      { type: 'p', text: 'Cast vinyl is manufactured by casting liquid PVC onto a sheet and allowing it to cure. The process results in a thin, highly conformable film that stretches and conforms around curves, rivets, bumpers, mirrors, and door handles without lifting or wrinkling. It has a lifespan of 5–7 years for vehicle wraps and handles Manitoba\'s freeze-thaw cycles and temperature extremes well. It\'s the professional standard for full vehicle wraps.' },
      { type: 'h2', text: 'What Is Calendared Vinyl?' },
      { type: 'p', text: 'Calendared vinyl is manufactured differently — PVC is pushed through rollers into a sheet. The result is a thicker, less conformable material. It works well on flat and mildly curved surfaces, is more cost-effective than cast vinyl, has a lifespan of 3–5 years, and is not recommended for complex curves, recessed areas, or full wraps. It\'s more prone to lifting and shrinking in extreme temperature changes.' },
      { type: 'image', src: '/image-assets/vehicle_graphics_2.webp', alt: 'Close-up of cast vinyl vehicle wrap conforming around a curved vehicle surface — professional wrap installation Winnipeg' },
      { type: 'h2', text: 'Which Is Right for Your Vehicle?' },
      { type: 'table', rows: [
        ['Vehicle/Application', 'Recommended Vinyl'],
        ['Full wrap — car, van, or truck', 'Cast vinyl'],
        ['Complex curves, bumpers, mirrors, door handles', 'Cast vinyl'],
        ['Flat panel graphics only (sides of a flat-bed truck)', 'Calendared vinyl acceptable'],
        ['Delivery van — full coverage', 'Cast vinyl'],
        ['Simple door decal with logo', 'Calendared vinyl acceptable'],
        ['Fleet wrap (5+ vehicles)', 'Cast vinyl — durability and consistency matter at scale'],
      ]},
      { type: 'h2', text: 'Manitoba Climate Considerations' },
      { type: 'p', text: 'Winnipeg experiences some of the most extreme temperature swings in Canada — from -40°C in January to +35°C in summer. Calendared vinyl shrinks more in cold and is more susceptible to lifting at seams during freeze-thaw cycles. For any vehicle that will be parked outdoors year-round in Manitoba, cast vinyl is the right choice. The cost difference per vehicle is $200–$600 — a small premium relative to the total wrap investment and the difference in lifespan.' },
      { type: 'h2', text: 'The Laminate Question' },
      { type: 'p-link', text: 'Regardless of which vinyl you use, automotive-grade laminate should be applied over the printed wrap. Laminate protects the print from UV fading, abrasion, fuel spills, and minor scratches. A wrap without laminate will fade significantly faster — especially under Manitoba\'s summer sun. At OnBoard, laminate is always included. See our full ', linkText: 'vehicle wrap product page', linkTo: '/products/vehicle-wraps-winnipeg', after: '.' },
    ],
    faqs: [
      { q: 'Can I request cast vinyl specifically when getting a quote?', a: 'Yes, and you should. If a shop doesn\'t proactively specify vinyl type in their quote, ask. It should be listed as a line item.' },
      { q: 'Does the vinyl type affect the look of the wrap?', a: 'Cast vinyl has a thinner, more conforming appearance that tends to look more OEM and polished. Calendared vinyl can sometimes show micro-wrinkling on curves.' },
    ],
    relatedSlugs: ['vehicle-wraps-vs-billboards-winnipeg', 'same-day-printing-winnipeg-guide'],
  },

  'same-day-printing-winnipeg-guide': {
    title: "Same-Day Printing in Winnipeg: What's Possible, What's Not, and How to Order",
    metaTitle: 'Same-Day Printing in Winnipeg: What\'s Possible, What\'s Not, and How to Order',
    metaDesc: 'Need business cards, banners, or flyers printed today in Winnipeg? Here\'s what\'s actually possible for same-day and rush printing — and how to order without the stress.',
    category: 'Print',
    date: 'January 28, 2025',
    readTime: '4 min read',
    heroImage: { src: 'https://images.unsplash.com/photo-1662001234358-45b7493d2bc0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Same-day printing in Winnipeg — business cards and flyers printed fast by OnBoard Print & Signs' },
    content: [
      { type: 'p', text: 'You needed it yesterday. We get it — and we\'ve heard that sentence a lot. Whether it\'s a last-minute trade show, a grand opening that got moved up, or business cards you forgot to reorder before a big meeting, rush printing happens. Here\'s an honest guide to what Winnipeg same-day and rush printing actually looks like, what\'s realistic, and how to make the process go smoothly.' },
      { type: 'h2', text: 'What Can Actually Be Done Same-Day in Winnipeg?' },
      { type: 'p', text: 'Same-day turnaround is realistic for: business cards (standard sizes, standard stocks — no specialty finishes), flyers (letter or tabloid, standard coated stock), vinyl banners (standard sizes), foam board signs, basic coroplast yard signs, and posters.' },
      { type: 'p', text: 'Rush possible (1–2 days), but not same-day: premium cardstock with specialty finishes (soft-touch, spot UV, foil), die-cut shapes, and large-format prints requiring special media.' },
      { type: 'p', text: 'Cannot be rushed — quality requires time: vehicle wraps (vinyl needs cure time), LED channel letter signs (fabrication cannot be safely compressed), city permits (timeline controlled by the city), and specialty wallpaper installations.' },
      { type: 'h2', text: 'How to Place a Same-Day Print Order Without the Stress' },
      { type: 'list', items: [
        'Step 1: Call before anything else. Don\'t email. Don\'t fill out a web form. Call or WhatsApp us directly and describe what you need.',
        'Step 2: Have your file ready. Same-day printing requires a print-ready file. PDF (with bleed and crop marks) is ideal.',
        'Step 3: Know your exact specs. Size, quantity, single or double-sided, finish (matte or gloss). Ambiguity costs time.',
        'Step 4: Approve fast. We\'ll send a digital proof. Your approval needs to come back within minutes, not hours, for same-day to work.',
      ]},
      { type: 'image', src: 'https://images.unsplash.com/photo-1773904215704-139e9ff8c894?q=80&w=1288&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Large-format banner printing — same-day rush print orders available in Winnipeg' },
      { type: 'h2', text: 'Why Same-Day Costs More (And Why That\'s Fair)' },
      { type: 'p', text: 'Rush orders require production staff to prioritize your job over scheduled work. Depending on the quantity and complexity, same-day printing carries a rush fee — typically 15–30% over standard pricing. It\'s a fair trade for guaranteed same-day delivery when you need it. We\'ll always quote the rush fee upfront before you commit.' },
      { type: 'h2', text: "The One Thing We Won't Rush" },
      { type: 'p-link', text: 'Quality. If the job genuinely can\'t be done to our standard in the timeframe, we\'ll tell you. We won\'t rush a vehicle wrap installation because rushed vinyl application leads to lifting, bubbles, and re-work costs that are far more expensive than waiting. For same-day print jobs, though — we\'re built for it. Check out our ', linkText: 'business cards & flyers', linkTo: '/products/business-cards-flyers-winnipeg', after: ' for more on what we print.' },
    ],
    faqs: [
      { q: 'What time do I need to call to get same-day?', a: 'Call us as early in the morning as possible. Order cut-off for same-day depends on quantity and complexity — call us and we\'ll give you a straight answer.' },
      { q: 'Can you deliver same-day orders?', a: 'Contact us — we can arrange delivery for some orders. Local pickup is always available.' },
      { q: 'Is the quality the same on rush orders?', a: 'Yes. Same materials, same production standards. Rush refers to the scheduling priority, not the output quality.' },
    ],
    relatedSlugs: ['new-business-signage-checklist-winnipeg', 'custom-wallpaper-vs-paint-winnipeg-commercial'],
  },

  'why-your-winnipeg-business-needs-a-website-not-just-a-sign': {
    title: 'Why Your Winnipeg Business Needs a Website — Not Just a Great Sign',
    metaTitle: 'Why Your Winnipeg Business Needs a Website — Not Just a Great Sign',
    metaDesc: 'Your storefront sign gets people through the door. Your website gets them to find you first. Here\'s why Winnipeg businesses can\'t afford to choose one over the other in 2025.',
    category: 'Web Development',
    date: 'January 20, 2025',
    readTime: '5 min read',
    heroImage: { src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=80&auto=format&fit=crop', alt: 'Custom business website displayed on a laptop — web design and development for Winnipeg small businesses' },
    content: [
      { type: 'p', text: 'You spent $8,000 on a stunning LED channel letter sign. It looks incredible at night. People drive by and notice it. And then — they pull out their phone and Google your business name. What do they find? If the answer is "not much," or worse, "a competitor\'s website," you\'ve lost the customer that your sign just captured. Physical signage and a professional website aren\'t two separate investments. They\'re two halves of the same first impression.' },
      { type: 'h2', text: 'The Way Customers Actually Find Businesses in 2025' },
      { type: 'p', text: 'The customer journey for most local businesses in Winnipeg looks like this: They see your sign, your vehicle wrap, or hear about you from someone. They Google your business name. They land on your website. They decide in 8 seconds whether to call you or go back and click the next result. Your sign gets them to step one. Your website determines whether they make it to step four.' },
      { type: 'h2', text: 'What a Professional Business Website Actually Does' },
      { type: 'p', text: 'A well-built business website isn\'t just a digital business card. When done right, it:' },
      { type: 'list', items: [
        'Ranks on Google for the searches your customers are already making',
        'Answers the questions people have before they call — services, pricing, portfolio, about the team',
        'Converts visitors into leads through clear calls to action, contact forms, and phone number prominence',
        'Builds trust — customers research before they commit, and a professional website signals that you\'re a legitimate, established business',
        'Works while you sleep — a sign is visible during business hours. Your website is generating awareness and inquiries at 2am',
      ]},
      { type: 'h2', text: 'Signs vs. Website — What Each Does Best' },
      { type: 'table', rows: [
        ['', 'Physical Signage', 'Professional Website'],
        ['Who sees it', 'People physically nearby', 'Anyone searching online — local or regional'],
        ['When it works', 'During daylight / business hours', '24/7, every day'],
        ['What it communicates', 'You exist, you\'re here, here\'s your brand', 'Everything — services, portfolio, pricing, trust signals'],
        ['Lead generation', 'Passive — they have to walk in or call', 'Active — built-in contact forms, CTAs, chat'],
        ['Search visibility', 'Zero — signs don\'t rank on Google', 'High — every page can rank for local searches'],
      ]},
      { type: 'p', text: 'The businesses that win locally in Winnipeg are the ones doing both well. The sign captures physical attention. The website captures digital attention. Together, they create a brand that customers encounter everywhere they look.' },
      { type: 'image', src: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=1600&q=80&auto=format&fit=crop', alt: 'Winnipeg small business owner reviewing their custom website on a smartphone' },
      { type: 'h2', text: "What We Build — and Why It's Different Coming from Us" },
      { type: 'p', text: 'Most web agencies build websites. We build brand systems — and there\'s a difference. We already understand your physical brand: your sign, your vehicle wrap, your printed materials, the colours your customers associate with you before they ever visit your website. When we build your website, we\'re not starting from a blank template and guessing at your identity. We\'re extending a brand we already know.' },
      { type: 'h2', text: 'What We Offer in Web Development' },
      { type: 'p-link', text: 'Business websites, e-commerce stores, landing pages, mobile-responsive design, on-page SEO — all built around your existing brand. We also offer monthly management plans so you never have to worry about updates, security, or performance. See our full ', linkText: 'website & app development services', linkTo: '/services/website-application-development', after: '.' },
    ],
    faqs: [],
    relatedSlugs: ['led-channel-letter-sign-cost-winnipeg', 'new-business-signage-checklist-winnipeg'],
  },
};

/* ─── Post title lookup for related posts ─── */
function getPostTitle(slug) {
  return posts[slug]?.title || slug;
}

/* ─── Content renderers ─── */
function renderContent(block, i) {
  switch (block.type) {
    case 'p':
      return <p key={i} className="font-heading text-base leading-relaxed mb-4" style={{ color: '#444' }}>{block.text}</p>;
    case 'p-link':
      return (
        <p key={i} className="font-heading text-base leading-relaxed mb-4" style={{ color: '#444' }}>
          {block.text}<IL to={block.linkTo}>{block.linkText}</IL>{block.after}
        </p>
      );
    case 'h2':
      return <h2 key={i} className="font-heading font-bold text-2xl md:text-3xl tracking-tight mt-10 mb-4" style={{ color: '#111111' }}>{block.text}</h2>;
    case 'h3':
      return <h3 key={i} className="font-heading font-semibold text-lg mt-6 mb-2" style={{ color: '#111111' }}>{block.text}</h3>;
    case 'bullets':
      return (
        <ul key={i} className="space-y-2 ml-1 mb-4">
          {block.items.map((b, j) => (
            <li key={j} className="font-heading text-base leading-relaxed flex items-center gap-2" style={{ color: '#444' }}>
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#E63B2E' }} />
              <span><strong style={{ color: '#111111' }}>{b.bold}</strong> — {b.text}</span>
            </li>
          ))}
        </ul>
      );
    case 'list':
      return (
        <ul key={i} className="space-y-2 ml-1 mb-4">
          {block.items.map((item, j) => (
            <li key={j} className="font-heading text-base leading-relaxed flex items-center gap-2" style={{ color: '#444' }}>
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#E63B2E' }} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case 'checklist':
      return (
        <ul key={i} className="space-y-2 ml-1 mb-4">
          {block.items.map((item, j) => (
            <li key={j} className="font-heading text-base leading-relaxed flex items-center gap-2" style={{ color: '#444' }}>
              <span className="w-4 h-4 border-2 rounded flex-shrink-0" style={{ borderColor: '#E63B2E' }} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case 'table': {
      const header = block.rows[0];
      const body = block.rows.slice(1);
      return (
        <div key={i} className="overflow-x-auto mb-6" style={{ borderRadius: '1rem' }}>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr style={{ backgroundColor: '#111111' }}>
                {header.map((h, j) => <th key={j} className="px-5 py-3 font-heading font-semibold text-sm" style={{ color: '#F5F3EE' }}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {body.map((row, j) => (
                <tr key={j} style={{ backgroundColor: j % 2 === 0 ? '#E8E4DD40' : '#E8E4DD20' }}>
                  {row.map((cell, k) => <td key={k} className="px-5 py-3 font-heading text-sm" style={{ color: '#333' }}>{cell}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    case 'image':
      return (
        <div key={i} className="my-8 overflow-hidden" style={{ borderRadius: '1.5rem' }}>
          {/* TODO: Replace src with local image from public folder */}
          <img src={block.src} alt={block.alt} width={1600} height={900} loading="lazy" className="w-full h-auto object-cover" style={{ maxHeight: '420px' }} />
        </div>
      );
    default:
      return null;
  }
}

/* ─── Main component ─── */
export default function BlogPostPage() {
  const { slug } = useParams();
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const post = posts[slug];

  useEffect(() => {
    if (!post) return;
    document.title = post.metaTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', post.metaDesc);
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', `https://onboardprints.ca/blog/${slug}`);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', post.metaTitle);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', post.metaDesc);
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', `https://onboardprints.ca/blog/${slug}`);

    // BreadcrumbList schema
    const breadcrumbSchema = document.createElement('script');
    breadcrumbSchema.type = 'application/ld+json';
    breadcrumbSchema.id = 'blog-breadcrumb-schema';
    breadcrumbSchema.textContent = JSON.stringify({
      "@context": "https://schema.org", "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://onboardprints.ca/" },
        { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://onboardprints.ca/blog" },
        { "@type": "ListItem", "position": 3, "name": post.title, "item": `https://onboardprints.ca/blog/${slug}` },
      ],
    });
    document.head.appendChild(breadcrumbSchema);

    // Article schema
    const articleSchema = document.createElement('script');
    articleSchema.type = 'application/ld+json';
    articleSchema.id = 'blog-article-schema';
    articleSchema.textContent = JSON.stringify({
      "@context": "https://schema.org", "@type": "Article",
      "headline": post.title,
      "description": post.metaDesc,
      "image": post.heroImage.src,
      "author": { "@type": "Organization", "name": "OnBoard Print & Signs" },
      "publisher": { "@type": "Organization", "name": "OnBoard Print & Signs", "logo": { "@type": "ImageObject", "url": "https://onboardprints.ca/onboard_logo.svg" } },
      "datePublished": post.date,
      "mainEntityOfPage": { "@type": "WebPage", "@id": `https://onboardprints.ca/blog/${slug}` },
    });
    document.head.appendChild(articleSchema);

    // FAQPage schema
    let faqSchema;
    if (post.faqs.length > 0) {
      faqSchema = document.createElement('script');
      faqSchema.type = 'application/ld+json';
      faqSchema.id = 'blog-faq-schema';
      faqSchema.textContent = JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        "mainEntity": post.faqs.map((faq) => ({ "@type": "Question", "name": faq.q, "acceptedAnswer": { "@type": "Answer", "text": faq.a } })),
      });
      document.head.appendChild(faqSchema);
    }

    return () => {
      document.getElementById('blog-breadcrumb-schema')?.remove();
      document.getElementById('blog-article-schema')?.remove();
      document.getElementById('blog-faq-schema')?.remove();
    };
  }, [post, slug]);

  useEffect(() => {
    if (!post) return;
    const ctx = gsap.context(() => { gsap.from('.blog-hero-content', { y: 40, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.2 }); }, heroRef);
    return () => ctx.revert();
  }, [post]);

  useEffect(() => {
    if (!post) return;
    const ctx = gsap.context(() => { gsap.from('.blog-content-section', { y: 30, opacity: 0, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: contentRef.current, start: 'top 80%' } }); }, contentRef);
    return () => ctx.revert();
  }, [post]);

  if (!post) {
    return (
      <main className="min-h-screen pt-40 pb-20 px-6 text-center">
        <h1 className="font-heading font-bold text-3xl mb-4" style={{ color: '#111111' }}>Post Not Found</h1>
        <Link to="/blog" className="font-heading font-semibold text-sm" style={{ color: '#E63B2E' }}>&larr; Back to Blog</Link>
      </main>
    );
  }

  return (
    <>
      {/* Hero */}
      <section ref={heroRef} className="relative pt-40 pb-16 px-6 md:px-12" style={{ backgroundColor: '#111111' }}>
        <div className="blog-hero-content max-w-3xl mx-auto">
          <Breadcrumbs current={post.title} />
          <div className="flex items-center gap-3 mb-4">
            <span className="font-data text-[10px] tracking-widest uppercase px-2.5 py-1" style={{ color: '#fff', backgroundColor: '#E63B2E', borderRadius: '0.5rem' }}>{post.category}</span>
            <span className="flex items-center gap-1 font-data text-xs" style={{ color: '#E8E4DD66' }}><Clock size={12} /> {post.readTime}</span>
          </div>
          <h1 className="font-heading font-bold text-3xl md:text-5xl tracking-tight mb-4" style={{ color: '#F5F3EE' }}>{post.title}</h1>
          <p className="font-heading text-sm" style={{ color: '#E8E4DD66' }}>By the OnBoard Team · {post.date} · Winnipeg, MB</p>
        </div>
      </section>

      {/* Hero image */}
      <section className="px-6 md:px-12 py-8" style={{ backgroundColor: '#F5F3EE' }}>
        <div className="max-w-4xl mx-auto overflow-hidden" style={{ borderRadius: '2rem' }}>
          {/* TODO: Replace src with local image from public folder */}
          <img src={post.heroImage.src} alt={post.heroImage.alt} width={1600} height={900} loading="eager" className="w-full h-auto object-cover" style={{ maxHeight: '500px' }} />
        </div>
      </section>

      {/* Content */}
      <section ref={contentRef} className="py-12 md:py-20 px-6 md:px-12" style={{ backgroundColor: '#F5F3EE' }}>
        <div className="blog-content-section max-w-3xl mx-auto">
          {post.content.map((block, i) => renderContent(block, i))}
        </div>
      </section>

      {/* FAQs */}
      {post.faqs.length > 0 && (
        <section className="py-16 md:py-24 px-6 md:px-12" style={{ backgroundColor: '#111111' }}>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <p className="font-data text-xs tracking-widest uppercase text-accent mb-3">Common Questions</p>
              <h2 className="font-heading font-bold text-2xl md:text-4xl tracking-tight" style={{ color: '#F5F3EE' }}>
                Frequently Asked <span className="font-drama italic" style={{ color: '#E63B2E' }}>Questions.</span>
              </h2>
            </div>
            {post.faqs.map((faq) => <FaqItem key={faq.q} {...faq} />)}
          </div>
        </section>
      )}

      {/* Related Posts */}
      <section className="py-16 px-6 md:px-12" style={{ backgroundColor: '#F5F3EE' }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading font-bold text-2xl md:text-3xl tracking-tight mb-6 text-center" style={{ color: '#111111' }}>Related Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {post.relatedSlugs.map((rs) => (
              <Link key={rs} to={`/blog/${rs}`} className="group block p-6 border transition-colors duration-200 hover:bg-primary/20" style={{ borderRadius: '1.5rem', borderColor: '#E8E4DD60' }}>
                <span className="font-data text-[10px] tracking-widest uppercase" style={{ color: '#E63B2E' }}>{posts[rs]?.category}</span>
                <h3 className="font-heading font-semibold text-base mt-1 group-hover:underline" style={{ color: '#111111' }}>{getPostTitle(rs)}</h3>
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link to="/quote" className="btn-magnetic inline-flex items-center gap-2 px-8 py-4 text-base font-heading font-semibold text-white" style={{ backgroundColor: '#E63B2E', borderRadius: '2rem' }}>
              <span className="btn-bg" style={{ backgroundColor: '#111111' }}></span>
              <span className="btn-text flex items-center gap-2">Get a Free Quote <ArrowRight size={14} /></span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
