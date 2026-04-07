import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ChevronDown, ChevronRight, Lightbulb, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ─── FAQ accordion item ─── */
function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b" style={{ borderColor: '#E8E4DD20' }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left bg-transparent border-none cursor-pointer"
      >
        <span className="font-heading font-semibold text-base" style={{ color: '#F5F3EE' }}>{q}</span>
        <ChevronDown
          size={18}
          className="flex-shrink-0 ml-4 transition-transform duration-300"
          style={{ color: '#E63B2E', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
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
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-heading mb-6" style={{ color: '#E8E4DD66' }}>
      <Link to="/" className="hover:underline" style={{ color: '#E8E4DD66' }}>Home</Link>
      <ChevronRight size={12} />
      <Link to="/products" className="hover:underline" style={{ color: '#E8E4DD66' }}>Products</Link>
      <ChevronRight size={12} />
      <span style={{ color: '#E8E4DDaa' }}>{current}</span>
    </nav>
  );
}

/* ─── Product data keyed by slug ─── */
const productData = {
  'led-channel-letter-signs-winnipeg': {
    title: 'LED Channel Letter Signs Winnipeg',
    metaTitle: 'LED Channel Letter Signs Winnipeg | OnBoard Print & Signs',
    metaDesc: 'Custom LED channel letter signs in Winnipeg. UL-certified fabrication, city permit handling, professional installation. Retail, restaurants, plazas & corporate. Call OnBoard today.',
    heroText: "Make your storefront unmissable — day and night. We design, fabricate, permit, and install custom LED channel letter signs for Winnipeg businesses. Everything is done in-house. No outsourcing, no surprises.",
    heroImage: { src: 'https://images.unsplash.com/photo-1604638823265-1cabe872a94a?w=1600&q=80&auto=format&fit=crop', alt: 'Close-up of illuminated LED channel letter sign on a building facade' },
    contentImage: { src: '/image-assets/storefront_channelLetter.webp', alt: 'Custom LED channel letter sign installed on a Winnipeg retail storefront — OnBoard Print & Signs', afterSection: 1 },
    sections: [
      {
        type: 'text',
        heading: 'What Are LED Channel Letter Signs?',
        body: 'LED channel letter signs are three-dimensional, individually fabricated letters or shapes that are internally illuminated by LED modules. They\'re the gold standard for retail and commercial storefronts because they\'re visible from a distance, highly durable, and available in multiple lighting styles:',
        bullets: [
          { bold: 'Front-lit', text: 'light shines through the acrylic face (classic, high-visibility)' },
          { bold: 'Back-lit / Halo-lit', text: 'light projects onto the wall behind the letters (sophisticated, upscale look)' },
          { bold: 'Combo-lit', text: 'both front and back illuminated (maximum impact)' },
        ],
      },
      {
        type: 'table',
        heading: 'Materials & Substrates',
        rows: [
          ['Component', 'Options'],
          ['Letter Returns', 'Coil-bent aluminum'],
          ['Letter Faces', 'Acrylic — standard, translucent, or specialty colours'],
          ['Backing', 'Aluminum or ACP backing · Polycarbonate for halo-lit letters'],
          ['Illumination', 'UL-listed LED modules'],
          ['Structure', 'Hand-assembled, reinforced letter bodies'],
        ],
      },
      {
        type: 'process',
        heading: 'Our Process',
        steps: [
          'Consultation & site measurement',
          'Logo refinement & letter style development',
          '3D visualization & client approval',
          'Precision CNC / laser cutting of components',
          'LED placement, wiring & load calculation',
          'UL certification & electrical compliance',
          'Permit-ready drawings submitted to City of Winnipeg',
          'Professional installation by our licensed team',
          'Final illumination check & client walkthrough',
        ],
      },
      {
        type: 'list',
        heading: 'Applications',
        items: [
          'Retail storefronts',
          'Shopping plazas and malls',
          'Restaurants and franchises',
          'Corporate offices and buildings',
          'Daytime and nighttime brand identification',
        ],
      },
      {
        type: 'tip',
        icon: 'lightbulb',
        title: 'Before you order:',
        text: "Ask your landlord or property management company for the plaza's signage requirements and any applicable codes. We'll review them and handle the permit drawings from there — you don't need to figure that part out.",
      },
      {
        type: 'text',
        heading: 'Why OnBoard for Channel Letters?',
        body: 'We handle the entire process under one roof — from the first design sketch to the final electrical connection. Our fabrication is UL-certified, and we handle all city permits. We never recommend skipping permits or certifications to save money. It protects you legally, and it\'s the right way to do the job.',
      },
    ],
    faqs: [
      { q: 'How long do LED channel letter signs last?', a: 'Quality LED modules are rated for 50,000+ hours. With proper installation and maintenance, your sign should perform reliably for 10+ years.' },
      { q: 'Do I need a permit for a channel letter sign in Winnipeg?', a: 'Yes — most commercial signs in Winnipeg require a permit. We prepare all permit drawings and coordinate with the city on your behalf.' },
      { q: 'Can you match my exact brand colours?', a: 'Yes. We colour-match acrylic faces to your brand\'s Pantone or CMYK specifications.' },
      { q: 'What if my landlord has signage restrictions?', a: 'Provide us with the criteria and we\'ll design within those constraints — we do this regularly for plaza tenants.' },
    ],
    relatedProducts: [
      { label: 'Window Graphics', slug: '/products/window-graphics-winnipeg' },
      { label: 'Yard Signs', slug: '/products/yard-signs-winnipeg' },
    ],
  },

  'vehicle-wraps-winnipeg': {
    title: 'Vehicle Wraps Winnipeg',
    metaTitle: 'Vehicle Wraps Winnipeg | Fleet & Car Wraps | OnBoard Print & Signs',
    metaDesc: 'Professional vehicle wraps in Winnipeg. Cast & calendared vinyl, fleet wraps, delivery vans, pickup trucks, trailers. Expert installation. Get a quote from OnBoard today.',
    heroText: 'Turn your vehicle into a moving billboard. We design, print, and install professional vehicle wraps in Winnipeg for everything from a single company car to a full commercial fleet.',
    heroImage: { src: '/image-assets/vehicle_graphics_6.webp', alt: 'Professional vehicle wrap on a commercial vehicle — OnBoard Print & Signs Winnipeg' },
    contentImage: { src: '/image-assets/vehicle_graphics_5.webp', alt: 'Vehicle wrap installation in progress — cast vinyl applied to a commercial van in Winnipeg', afterSection: 1 },
    sections: [
      {
        type: 'table',
        heading: 'Materials & Substrates',
        rows: [
          ['Material', 'Best For'],
          ['Cast vinyl films', 'Long-term wraps, vehicles with curves (bumpers, mirrors)'],
          ['Calendared vinyl', 'Flat panel wraps, cost-effective option'],
          ['Reflective vinyl', 'Fleet & safety vehicles, high-visibility applications'],
          ['Perforated window film', 'One-way vision for windows (see out, can\'t see in)'],
          ['Automotive-grade laminate', 'UV and abrasion protection over any printed wrap'],
        ],
      },
      {
        type: 'process',
        heading: 'Our Process',
        steps: [
          'Consultation & vehicle measurements',
          'Professional graphic design & layout',
          'Large-format digital printing',
          'Precision cutting & trimming',
          'Lamination for UV & abrasion protection',
          'Surface preparation (this step is non-negotiable — improper prep causes wrap failure)',
          'Expert installation by our trained team',
        ],
      },
      {
        type: 'list',
        heading: 'Applications',
        items: [
          'Commercial fleets & service vehicles',
          'Delivery vans & box trucks',
          'Pickup trucks & trailers',
          'Construction and trades vehicles',
          'Promotional and brand awareness campaigns',
        ],
      },
      {
        type: 'tip',
        icon: 'lightbulb',
        title: 'Choosing the right vinyl:',
        text: "Cast vinyl conforms to complex curves and lasts longer — it's the right choice for most vehicles. Calendared vinyl is more cost-effective and works well on flat panels. We'll tell you which is right for your vehicle before we quote.",
      },
    ],
    faqs: [
      { q: 'How long does a vehicle wrap last?', a: 'Cast vinyl wraps typically last 5–7 years with proper care. Calendared vinyl wraps last 3–5 years.' },
      { q: 'Can you wrap just part of my vehicle?', a: 'Yes — partial wraps, spot graphics, and decals are all options we offer.' },
      { q: 'Does wrapping damage my paint?', a: 'When properly installed and removed, quality vinyl does not damage factory paint. In fact, it protects the paint underneath.' },
      { q: 'How do I care for my wrap?', a: 'Hand washing is best. Avoid pressure washers and abrasive cleaners. We\'ll give you a care sheet after installation.' },
    ],
    relatedProducts: [
      { label: 'Window Graphics', slug: '/products/window-graphics-winnipeg' },
      { label: 'Business Cards & Flyers', slug: '/products/business-cards-flyers-winnipeg' },
    ],
  },

  'custom-wallpaper-winnipeg': {
    title: 'Custom Wallpaper & Wall Murals Winnipeg',
    metaTitle: 'Custom Wallpaper Winnipeg | Commercial Wall Murals | OnBoard Print & Signs',
    metaDesc: 'Custom wallpaper and wall murals for retail, offices, restaurants, and feature walls in Winnipeg. PVC-free options, UV coated, professional installation. OnBoard Print & Signs.',
    heroText: 'Transform any wall into a brand statement. We design, print, and install custom commercial wallpaper and wall murals throughout Winnipeg — from single feature walls to full-room installations.',
    heroImage: { src: '/image-assets/wall_papers_onb.webp', alt: 'Custom commercial wallpaper installation by OnBoard Print & Signs — branded wall mural in Winnipeg' },
    contentImage: { src: 'https://images.unsplash.com/photo-1594100618568-1c6cd8daafdf?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Custom wall mural panels installed in a commercial interior — high-resolution large-format wallpaper', afterSection: 2 },
    sections: [
      {
        type: 'callout',
        text: "This is one of our signature offerings that most Winnipeg competitors can't match in-house. We handle design, printing, and installation as a complete package.",
      },
      {
        type: 'table',
        heading: 'Materials & Substrates',
        rows: [
          ['Material', 'Properties'],
          ['PVC-free wallpaper', 'Eco-conscious, suitable for most commercial interiors'],
          ['Vinyl wallcoverings', 'High-traffic areas, scrubbable, long-lasting'],
          ['Textured wallpaper', 'Premium tactile finish for feature walls'],
          ['Peel-and-stick wall film', 'Temporary installations, rental spaces'],
          ['Commercial-grade wall media', 'Maximum durability for busy environments'],
        ],
      },
      {
        type: 'process',
        heading: 'Our Process',
        steps: [
          'Custom graphic design & image scaling to your wall dimensions',
          'Colour management & proofing — you approve before we print',
          'High-resolution large-format printing',
          'Precision panelling & trimming',
          'Professional wall surface preparation',
          'Expert installation & panel alignment',
        ],
      },
      {
        type: 'list',
        heading: 'Applications',
        items: [
          'Retail & commercial interiors',
          'Restaurants & cafés',
          'Offices & corporate reception areas',
          'Feature walls & waiting rooms',
          'Event & promotional interiors',
        ],
      },
      {
        type: 'tip',
        icon: 'lightbulb',
        title: 'Always choose UV coating on your wallpaper.',
        text: "It significantly extends the life of the print and makes the surface easy to wipe clean — especially important in restaurants, cafés, or any high-traffic space.",
      },
    ],
    faqs: [
      { q: 'How long does commercial wallpaper last?', a: 'With UV coating and proper care, commercial wallpaper in a moderate-traffic environment typically lasts 5–10 years.' },
      { q: 'Can you design the mural from scratch?', a: 'Yes. Our design team can create original artwork, scale existing brand assets, or work from photos you provide.' },
      { q: 'What surface preparation is required?', a: 'Walls must be clean, smooth, and dry. We assess the wall condition before installation and will advise if any prep work is needed.' },
    ],
    relatedProducts: [
      { label: 'Window Graphics', slug: '/products/window-graphics-winnipeg' },
      { label: 'LED Channel Letter Signs', slug: '/products/led-channel-letter-signs-winnipeg' },
    ],
  },

  'window-graphics-winnipeg': {
    title: 'Window Graphics & Window Film Winnipeg',
    metaTitle: 'Window Graphics Winnipeg | Perforated & Frosted Window Film | OnBoard',
    metaDesc: 'Custom window graphics in Winnipeg. Perforated one-way vision film, frosted vinyl, full-colour window decals. Retail, offices, restaurants. OnBoard Print & Signs.',
    heroText: 'Your storefront windows are prime real estate. We design and install custom window graphics in Winnipeg that promote your brand, add privacy, or both.',
    heroImage: { src: 'https://images.unsplash.com/photo-1574660100354-168f8e1cc8d0?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Custom window graphics applied to a Winnipeg retail storefront — perforated vinyl and window film' },
    contentImage: { src: 'https://images.unsplash.com/photo-1718011096230-00cbc9e9eac1?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Window graphic installation — frosted vinyl and full-colour decal on a commercial storefront window', afterSection: 1 },
    sections: [
      {
        type: 'text',
        heading: 'Types of Window Graphics',
        body: 'We offer a full range of window graphic solutions for Winnipeg businesses:',
        bullets: [
          { bold: 'Full-colour window decals', text: 'bold, high-impact graphics printed on vinyl and applied to glass' },
          { bold: 'Perforated one-way vision film', text: 'see-through from inside, full graphic from outside (great for window coverage without blocking light)' },
          { bold: 'Frosted/etched vinyl', text: 'privacy or decorative effect that mimics sandblasted glass at a fraction of the cost' },
          { bold: 'Cut vinyl lettering', text: 'clean, precise lettering for hours, logos, and contact info' },
        ],
      },
      {
        type: 'list',
        heading: 'Applications',
        items: [
          'Retail storefronts & displays',
          'Restaurant & café privacy and branding',
          'Office privacy & interior branding',
          'Seasonal & promotional window campaigns',
          'Safety markings & glass identification',
        ],
      },
      {
        type: 'process',
        heading: 'Our Process',
        steps: [
          'Design & layout',
          'Precision printing & cutting',
          'Surface prep & expert application',
          'Cleanup & quality inspection',
        ],
      },
    ],
    faqs: [],
    relatedProducts: [
      { label: 'Custom Wallpaper', slug: '/products/custom-wallpaper-winnipeg' },
      { label: 'LED Channel Letter Signs', slug: '/products/led-channel-letter-signs-winnipeg' },
    ],
  },

  'yard-signs-winnipeg': {
    title: 'Custom Yard Signs Winnipeg',
    metaTitle: 'Yard Signs Winnipeg | Coroplast & Alupanel Signs | OnBoard Print & Signs',
    metaDesc: 'Custom yard signs in Winnipeg. Coroplast, Alupanel, vinyl and acrylic options. Wide-format printing, CNC routing, UV lamination. Fast turnaround. OnBoard Print & Signs.',
    heroText: "Fast to produce, hard to miss. We print custom yard signs in Winnipeg on the substrate that fits your project — whether it's a weekend event or a long-term construction hoarding.",
    heroImage: { src: 'https://images.unsplash.com/photo-1604443572256-6585931858bf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Custom yard signs for Winnipeg businesses — coroplast and alupanel outdoor signage' },
    contentImage: { src: '/image-assets/channel_signage_7.webp', alt: 'Custom outdoor signage printed and installed by OnBoard Print & Signs in Winnipeg', afterSection: 1 },
    sections: [
      {
        type: 'table',
        heading: 'Materials',
        rows: [
          ['Substrate', 'Properties', 'Best For'],
          ['Coroplast', 'Lightweight, weatherproof, cost-effective', 'Short-term events, real estate, promotions'],
          ['Alupanel', 'Rigid, premium finish, long-lasting', 'Semi-permanent outdoor use, construction'],
          ['Vinyl', 'Flexible, large-format', 'Banners, overlays, site wraps'],
          ['Acrylic', 'Glossy, high-end finish', 'Indoor displays, premium outdoor use'],
        ],
      },
      {
        type: 'list',
        heading: 'Processes',
        items: [
          'Wide-format digital printing',
          'CNC routing (custom shapes)',
          'Laser engraving',
          'UV lamination for outdoor durability',
        ],
      },
      {
        type: 'list',
        heading: 'Applications',
        items: [
          'New business advertisement',
          'Fleet rebranding & site identification',
          'Construction hoarding',
          'Real estate & rental signage',
          'Events & promotions',
        ],
      },
    ],
    faqs: [],
    relatedProducts: [
      { label: 'Business Cards & Flyers', slug: '/products/business-cards-flyers-winnipeg' },
      { label: 'LED Channel Letter Signs', slug: '/products/led-channel-letter-signs-winnipeg' },
    ],
  },

  'business-cards-flyers-winnipeg': {
    title: 'Business Cards & Flyers Winnipeg',
    metaTitle: 'Business Cards & Flyers Winnipeg | Same Day Printing | OnBoard Print & Signs',
    metaDesc: 'Premium business cards and flyers in Winnipeg. Matte, gloss, spot UV, recycled stocks. Same-day available. High-resolution printing with colour calibration. OnBoard Print & Signs.',
    heroText: "First impressions are physical. We print business cards and flyers in Winnipeg on premium stocks with finishing options that make people notice — and hold onto — your print.",
    heroImage: { src: 'https://images.unsplash.com/photo-1599108859519-8ac78fd1b912?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Premium business cards printed in Winnipeg — matte and gloss finish options from OnBoard Print & Signs' },
    contentImage: { src: 'https://images.unsplash.com/photo-1624351137372-e0bd64acbc71?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Custom flyer printing in Winnipeg — high-resolution large-format flyers on premium coated stock', afterSection: 2 },
    sections: [
      {
        type: 'emergency',
        title: 'Need it today?',
        text: 'Same-day business cards and banners are available for urgent orders. Call or WhatsApp us with your deadline.',
      },
      {
        type: 'table',
        heading: 'Materials',
        rows: [
          ['Stock', 'Finish Options'],
          ['Premium cardstock', 'Matte, gloss, silk'],
          ['Recycled/eco paper', 'Uncoated natural finish'],
          ['Textured specialty papers', 'Linen, felt, laid textures'],
          ['Coated flyer paper', 'Gloss or matte coated'],
          ['Uncoated flyer paper', 'Natural, writeable surface'],
        ],
      },
      {
        type: 'list',
        heading: 'Finishing Options',
        items: [
          'Standard lamination (matte or gloss)',
          'Spot UV coating (glossy highlight on specific elements)',
          'Soft-touch lamination (velvety, premium feel)',
          'Foil stamping (available on select runs)',
          'Precision die-cutting (custom shapes)',
        ],
      },
      {
        type: 'list',
        heading: 'Applications',
        items: [
          'Corporate networking & branding',
          'Product promotions & announcements',
          'Restaurant menus & table cards',
          'Event handouts & trade show materials',
          'Local marketing & door-to-door distribution',
        ],
      },
    ],
    faqs: [
      { q: 'What file format do you need?', a: 'PDF (print-ready, with bleed and crop marks) is preferred. We can also work with AI, EPS, or high-resolution PNG/JPG. Our design team can prepare files for you if needed.' },
      { q: "What's the turnaround on standard business cards?", a: 'Typically 2–3 business days. Rush and same-day options are available — call to confirm availability.' },
      { q: 'Can you match my brand colours exactly?', a: 'Yes. We calibrate colour on every job and can work to Pantone or CMYK specs.' },
    ],
    relatedProducts: [
      { label: 'Yard Signs', slug: '/products/yard-signs-winnipeg' },
      { label: 'Vehicle Wraps', slug: '/products/vehicle-wraps-winnipeg' },
    ],
  },
};

/* ─── Section renderers ─── */
function SectionText({ heading, body, bullets }) {
  return (
    <div>
      {heading && <h2 className="font-heading font-bold text-2xl md:text-3xl tracking-tight mb-4" style={{ color: '#111111' }}>{heading}</h2>}
      {body && <p className="font-heading text-base leading-relaxed mb-4" style={{ color: '#444' }}>{body}</p>}
      {bullets && (
        <ul className="space-y-2 ml-1">
          {bullets.map((b) => (
            <li key={b.bold} className="font-heading text-base leading-relaxed flex items-center gap-2" style={{ color: '#444' }}>
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#E63B2E' }} />
              <span><strong style={{ color: '#111111' }}>{b.bold}</strong> — {b.text}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function SectionTable({ heading, rows }) {
  const header = rows[0];
  const body = rows.slice(1);
  return (
    <div>
      <h2 className="font-heading font-bold text-2xl md:text-3xl tracking-tight mb-4" style={{ color: '#111111' }}>{heading}</h2>
      <div className="overflow-x-auto" style={{ borderRadius: '1rem' }}>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr style={{ backgroundColor: '#111111' }}>
              {header.map((h) => (
                <th key={h} className="px-5 py-3 font-heading font-semibold text-sm" style={{ color: '#F5F3EE' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {body.map((row, i) => (
              <tr key={i} style={{ backgroundColor: i % 2 === 0 ? '#E8E4DD40' : '#E8E4DD20' }}>
                {row.map((cell, j) => (
                  <td key={j} className="px-5 py-3 font-heading text-sm" style={{ color: '#333' }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SectionProcess({ heading, steps }) {
  return (
    <div>
      <h2 className="font-heading font-bold text-2xl md:text-3xl tracking-tight mb-6" style={{ color: '#111111' }}>{heading}</h2>
      <div className="space-y-3">
        {steps.map((step, i) => (
          <div key={i} className="flex items-start gap-4 p-4 border" style={{ borderRadius: '1rem', borderColor: '#E8E4DD60', backgroundColor: '#FFFFFF60' }}>
            <div
              className="w-8 h-8 flex-shrink-0 flex items-center justify-center font-data text-xs font-bold"
              style={{ backgroundColor: '#E63B2E', color: '#fff', borderRadius: '0.5rem' }}
            >
              {String(i + 1).padStart(2, '0')}
            </div>
            <span className="font-heading text-base" style={{ color: '#333' }}>{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionList({ heading, items }) {
  return (
    <div>
      <h2 className="font-heading font-bold text-2xl md:text-3xl tracking-tight mb-4" style={{ color: '#111111' }}>{heading}</h2>
      <ul className="space-y-2 ml-1">
        {items.map((item) => (
          <li key={item} className="font-heading text-base leading-relaxed flex items-center gap-2" style={{ color: '#444' }}>
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#E63B2E' }} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SectionTip({ title, text }) {
  return (
    <div className="flex gap-4 p-6 border" style={{ borderRadius: '1.25rem', borderColor: '#E63B2E30', backgroundColor: '#E63B2E08' }}>
      <Lightbulb size={22} className="flex-shrink-0 mt-0.5" style={{ color: '#E63B2E' }} />
      <div>
        <p className="font-heading font-semibold text-base mb-1" style={{ color: '#111111' }}>{title}</p>
        <p className="font-heading text-sm leading-relaxed" style={{ color: '#444' }}>{text}</p>
      </div>
    </div>
  );
}

function SectionCallout({ text }) {
  return (
    <div className="p-6 border-l-4" style={{ borderColor: '#E63B2E', backgroundColor: '#E63B2E08', borderRadius: '0 1rem 1rem 0' }}>
      <p className="font-heading text-base leading-relaxed font-medium" style={{ color: '#333' }}>{text}</p>
    </div>
  );
}

function SectionEmergency({ title, text }) {
  return (
    <div className="flex gap-4 p-6" style={{ borderRadius: '1.25rem', backgroundColor: '#E63B2E', color: '#fff' }}>
      <Zap size={22} className="flex-shrink-0 mt-0.5" />
      <div>
        <p className="font-heading font-bold text-base mb-1">{title}</p>
        <p className="font-heading text-sm leading-relaxed opacity-90">{text}</p>
      </div>
    </div>
  );
}

function renderSection(section, i) {
  switch (section.type) {
    case 'text': return <SectionText key={i} {...section} />;
    case 'table': return <SectionTable key={i} {...section} />;
    case 'process': return <SectionProcess key={i} {...section} />;
    case 'list': return <SectionList key={i} {...section} />;
    case 'tip': return <SectionTip key={i} {...section} />;
    case 'callout': return <SectionCallout key={i} {...section} />;
    case 'emergency': return <SectionEmergency key={i} {...section} />;
    default: return null;
  }
}

/* ─── Main page component ─── */
export default function ProductDetailPage() {
  const { slug } = useParams();
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const product = productData[slug];

  useEffect(() => {
    if (!product) return;
    document.title = product.metaTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', product.metaDesc);

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', `https://onboardprints.ca/products/${slug}`);

    // OG tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', product.metaTitle);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', product.metaDesc);
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', `https://onboardprints.ca/products/${slug}`);

    // Inject BreadcrumbList schema
    const breadcrumbSchema = document.createElement('script');
    breadcrumbSchema.type = 'application/ld+json';
    breadcrumbSchema.id = 'product-breadcrumb-schema';
    breadcrumbSchema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://onboardprints.ca/" },
        { "@type": "ListItem", "position": 2, "name": "Products", "item": "https://onboardprints.ca/products" },
        { "@type": "ListItem", "position": 3, "name": product.title, "item": `https://onboardprints.ca/products/${slug}` },
      ],
    });
    document.head.appendChild(breadcrumbSchema);

    // Inject FAQPage schema if FAQs exist
    let faqSchema;
    if (product.faqs.length > 0) {
      faqSchema = document.createElement('script');
      faqSchema.type = 'application/ld+json';
      faqSchema.id = 'product-faq-schema';
      faqSchema.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": product.faqs.map((faq) => ({
          "@type": "Question",
          "name": faq.q,
          "acceptedAnswer": { "@type": "Answer", "text": faq.a },
        })),
      });
      document.head.appendChild(faqSchema);
    }

    return () => {
      const bs = document.getElementById('product-breadcrumb-schema');
      if (bs) bs.remove();
      const fs = document.getElementById('product-faq-schema');
      if (fs) fs.remove();
    };
  }, [product, slug]);

  useEffect(() => {
    if (!product) return;
    const ctx = gsap.context(() => {
      gsap.from('.detail-hero-content', {
        y: 40, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.2,
      });
    }, heroRef);
    return () => ctx.revert();
  }, [product]);

  useEffect(() => {
    if (!product) return;
    const ctx = gsap.context(() => {
      gsap.from('.detail-section', {
        y: 40, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: contentRef.current, start: 'top 75%' },
      });
    }, contentRef);
    return () => ctx.revert();
  }, [product]);

  if (!product) {
    return (
      <main className="min-h-screen pt-40 pb-20 px-6 text-center">
        <h1 className="font-heading font-bold text-3xl mb-4" style={{ color: '#111111' }}>Product Not Found</h1>
        <Link to="/products" className="font-heading font-semibold text-sm" style={{ color: '#E63B2E' }}>&larr; Back to Products</Link>
      </main>
    );
  }

  return (
    <>
      {/* Hero */}
      <section ref={heroRef} className="relative pt-40 pb-16 px-6 md:px-12" style={{ backgroundColor: '#111111' }}>
        <div className="detail-hero-content max-w-3xl mx-auto">
          <Breadcrumbs current={product.title} />
          <h1 className="font-heading font-bold text-3xl md:text-5xl lg:text-6xl tracking-tight mb-6" style={{ color: '#F5F3EE' }}>
            {product.title.replace(' Winnipeg', ' ')}
            <span className="font-drama italic" style={{ color: '#E63B2E' }}>Winnipeg.</span>
          </h1>
          <p className="font-heading text-base md:text-lg leading-relaxed max-w-2xl" style={{ color: '#E8E4DD88' }}>
            {product.heroText}
          </p>
          <Link
            to="/quote"
            className="btn-magnetic inline-flex items-center gap-2 px-6 py-3 text-sm font-heading font-semibold text-white mt-8"
            style={{ backgroundColor: '#E63B2E', borderRadius: '2rem' }}
          >
            <span className="btn-bg" style={{ backgroundColor: '#333' }}></span>
            <span className="btn-text flex items-center gap-2">Get a Free Quote <ArrowRight size={14} /></span>
          </Link>
        </div>
      </section>

      {/* Hero image */}
      {product.heroImage && (
        <section className="px-6 md:px-12 py-8" style={{ backgroundColor: '#F5F3EE' }}>
          <div className="max-w-4xl mx-auto overflow-hidden" style={{ borderRadius: '2rem' }}>
            {/* TODO: Replace src with /images/[page-name]-hero.jpg from public folder */}
            <img
              src={product.heroImage.src}
              alt={product.heroImage.alt}
              width={1600}
              height={900}
              loading="eager"
              className="w-full h-auto object-cover"
              style={{ maxHeight: '500px' }}
            />
          </div>
        </section>
      )}

      {/* Content sections */}
      <section ref={contentRef} className="py-16 md:py-24 px-6 md:px-12" style={{ backgroundColor: '#F5F3EE' }}>
        <div className="max-w-3xl mx-auto space-y-12">
          {product.sections.map((section, i) => (
            <React.Fragment key={i}>
              <div className="detail-section">
                {renderSection(section, i)}
              </div>
              {product.contentImage && product.contentImage.afterSection === i && (
                <div className="detail-section overflow-hidden" style={{ borderRadius: '1.5rem' }}>
                  {/* TODO: Replace src with /images/[page-name]-content.jpg from public folder */}
                  <img
                    src={product.contentImage.src}
                    alt={product.contentImage.alt}
                    width={1600}
                    height={900}
                    loading="lazy"
                    className="w-full h-auto object-cover"
                    style={{ maxHeight: '420px' }}
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* FAQs */}
      {product.faqs.length > 0 && (
        <section className="py-16 md:py-24 px-6 md:px-12" style={{ backgroundColor: '#111111' }}>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <p className="font-data text-xs tracking-widest uppercase text-accent mb-3">Common Questions</p>
              <h2 className="font-heading font-bold text-2xl md:text-4xl tracking-tight" style={{ color: '#F5F3EE' }}>
                Frequently Asked{' '}
                <span className="font-drama italic" style={{ color: '#E63B2E' }}>Questions.</span>
              </h2>
            </div>
            {product.faqs.map((faq) => <FaqItem key={faq.q} {...faq} />)}
          </div>
        </section>
      )}

      {/* Related Products + CTA */}
      <section className="py-16 px-6 md:px-12" style={{ backgroundColor: '#F5F3EE' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading font-bold text-2xl md:text-3xl tracking-tight mb-6" style={{ color: '#111111' }}>
            Related Products
          </h2>
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {product.relatedProducts.map((rp) => (
              <Link
                key={rp.slug}
                to={rp.slug}
                className="inline-flex items-center gap-2 px-5 py-3 font-heading font-semibold text-sm border text-dark transition-colors duration-200 hover:bg-dark hover:text-white"
                style={{ borderRadius: '2rem', borderColor: '#111111' }}
              >
                {rp.label} <ArrowRight size={14} />
              </Link>
            ))}
          </div>
          <Link
            to="/quote"
            className="btn-magnetic inline-flex items-center gap-2 px-8 py-4 text-base font-heading font-semibold text-white"
            style={{ backgroundColor: '#E63B2E', borderRadius: '2rem' }}
          >
            <span className="btn-bg" style={{ backgroundColor: '#111111' }}></span>
            <span className="btn-text flex items-center gap-2">Request a Quote <ArrowRight size={14} /></span>
          </Link>
        </div>
      </section>
    </>
  );
}
