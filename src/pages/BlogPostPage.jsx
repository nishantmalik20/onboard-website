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
  "election-signs-winnipeg-2026": {
  "title": "Election Signs in Winnipeg: A 2026 Candidate's Guide",
  "metaTitle": "Election Signs Winnipeg: A 2026 Candidate's Guide",
  "metaDesc": "Planning election signs in Winnipeg for the Oct 28, 2026 vote? Get sizes, bulk coroplast pricing, City placement rules, and fast campaign turnaround.",
  "category": "Business Tips",
  "date": "June 18, 2026",
  "readTime": "8 min read",
  "heroImage": {
    "src": "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80&auto=format&fit=crop",
    "alt": "Rows of double-sided coroplast election lawn signs on H-stakes lined up outside a Winnipeg print shop before installation"
  },
  "content": [
    {
      "type": "p",
      "text": "If you're a candidate in Winnipeg's October 28, 2026 municipal election, here's the short answer: standard 18\"x24\" double-sided coroplast lawn signs run roughly $9 to $16 each in small batches, and the per-sign price drops fast with volume — often landing near $5 to $7 each once you order 100 or more, and lower again past 250. A typical ward campaign budgets for 150 to 400 lawn signs plus a handful of large 4'x8' signs for high-traffic corners. Add about $1 to $2 per sign for an H-stake or wire frame to get them in the ground."
    },
    {
      "type": "p",
      "text": "The bigger point: order your election signs in Winnipeg now, not in September. Coroplast, H-stakes, and ink are commodity items, but every candidate in the city hits the same suppliers in the final six weeks. We can turn a proof and a full run around in days — often with same-day printing and 24-hour turnaround on rush batches — but the campaigns that lock in early get the best pricing, the cleanest design help, and signs in voters' yards while opponents are still waiting on a proof."
    },
    {
      "type": "h2",
      "text": "What election signs in Winnipeg actually cost"
    },
    {
      "type": "p",
      "text": "Election sign pricing is almost entirely about quantity. The setup, the proof, and the print file are the same whether you order 25 signs or 250 — so the more you print, the less each one costs. Coroplast (corrugated plastic) is the workhorse material: it's light, weatherproof, holds up to Manitoba wind and rain through October, and it's cheap to produce at volume. Below is a realistic range for the most common election sign — an 18\"x24\" double-sided coroplast lawn sign, full colour, printed in-house in Winnipeg."
    },
    {
      "type": "table",
      "rows": [
        [
          "Quantity",
          "Per-sign (18\"x24\", double-sided coroplast)",
          "Approx. batch total"
        ],
        [
          "25",
          "$13 – $16",
          "$325 – $400"
        ],
        [
          "50",
          "$9 – $12",
          "$450 – $600"
        ],
        [
          "100",
          "$6.50 – $8.50",
          "$650 – $850"
        ],
        [
          "250+",
          "$4.50 – $6.50",
          "$1,125 – $1,625"
        ]
      ]
    },
    {
      "type": "p",
      "text": "These are ballpark ranges to help you budget — final pricing depends on size, single vs. double-sided, ink coverage, and whether you need stakes. For an exact number, we send free itemized quotes, usually within about two hours, so you can see line items for signs, stakes, design, and any rush fee before you commit a dollar of campaign money."
    },
    {
      "type": "h2",
      "text": "Sizes and where each one earns its keep"
    },
    {
      "type": "p",
      "text": "Most Winnipeg campaigns run two or three sizes. Don't overthink it — name recognition wins municipal races, so volume of small signs usually beats a few big ones, with a couple of large signs reserved for the spots everyone drives past."
    },
    {
      "type": "bullets",
      "items": [
        {
          "bold": "18\"x24\" lawn signs",
          "text": "The default. Cheap at volume, easy for supporters to plant, and the right size for residential front yards. This is where 70 to 80% of your order should sit."
        },
        {
          "bold": "24\"x36\" lawn signs",
          "text": "A step up in presence for busier residential streets, boulevards-adjacent private lots, and supporter homes on corner lots. Use sparingly — they cost more and you need fewer."
        },
        {
          "bold": "4'x8' large-format signs",
          "text": "Your billboard play. One or two of these on a consenting business property or a high-traffic private lot near a major intersection does the work of dozens of lawn signs. Mount on a sturdy wood or steel frame, not H-stakes."
        }
      ]
    },
    {
      "type": "h2",
      "text": "Single vs. double-sided, and how to stake them"
    },
    {
      "type": "p",
      "text": "Almost every lawn sign should be double-sided. Voters approach from both directions, and a one-sided sign is invisible to half of them. Single-sided only makes sense when a sign sits flat against a wall or window where one face will never be seen — which is rare in a yard-sign campaign. The small extra cost for double-sided printing is the best money in your sign budget."
    },
    {
      "type": "p",
      "text": "For mounting, you've got two standard options for coroplast:"
    },
    {
      "type": "list",
      "items": [
        "H-stakes (wire step-stakes): the classic galvanized wire frame that slides into the flutes on the bottom edge of a coroplast sign. Fast to install, easy to pull, and the cheapest way to get a sign standing — ideal for lawns.",
        "Wire frames / heavier ground stakes: a sturdier option for larger 24\"x36\" signs or windy, exposed locations where a light H-stake won't hold through a prairie gust."
      ]
    },
    {
      "type": "p",
      "text": "We supply stakes and frames with your order so everything ships ready to deploy — no scrambling at a hardware store the night before your volunteers head out."
    },
    {
      "type": "h2",
      "text": "City of Winnipeg placement rules every candidate should know"
    },
    {
      "type": "p",
      "text": "This is where campaigns get into trouble. Election sign placement in Winnipeg is governed by City rules, and bylaws do get updated — so treat the points below as the general framework and confirm the current regulations with the City of Winnipeg (and Elections Manitoba for provincial timing context) before you plant a single sign. As a rule of thumb that has held in Winnipeg:"
    },
    {
      "type": "bullets",
      "items": [
        {
          "bold": "Private property, with consent only",
          "text": "Place signs on private property where the owner has given permission. A supporter's front lawn is fine; a stranger's, a vacant lot, or a business you haven't asked is not."
        },
        {
          "bold": "Stay off public boulevards and medians",
          "text": "City boulevards, medians, and the road allowance are generally off-limits. The grassy strip between the sidewalk and the curb is usually public land, even if it fronts a private home — when in doubt, set the sign back onto the actual private lot."
        },
        {
          "bold": "Never block sightlines or traffic signs",
          "text": "Keep signs clear of intersections, driveways, crosswalks, and anything that obstructs a driver's view or competes with a stop sign, traffic signal, or street sign. Safety complaints get signs pulled fast."
        },
        {
          "bold": "Mind the timing and remove promptly",
          "text": "There are typically limits on how early signs can go up and a hard deadline to remove them after election day. Pull your signs quickly once October 28 has passed — leftover signs are the fastest way to annoy the voters and neighbours you just spent a campaign courting."
        }
      ]
    },
    {
      "type": "p",
      "text": "We can't make the call on every location for you, but we will print clear placement reminders and point you to the right City contacts so your volunteers aren't guessing on doorsteps."
    },
    {
      "type": "h2",
      "text": "Campaign turnaround and free design help"
    },
    {
      "type": "p",
      "text": "A campaign moves fast, and your sign printer should too. Everything here is done in-house in Winnipeg — design, printing, and finishing under one roof — so there's no middleman slowing down a reprint when your numbers come in or your slogan changes. Rush batches can move on same-day printing or 24-hour turnaround when you're up against a debate, an endorsement, or a sudden surge of volunteer requests."
    },
    {
      "type": "p",
      "text": "If you don't have a designer, we'll help you build a clean, readable sign for free. The fundamentals matter more than fancy artwork: your name big and bold, the office you're running for, the ward or position, and high contrast so it reads from a moving car. We'll set up the file, send you a proof, and get it production-ready without an extra design bill eating into your budget."
    },
    {
      "type": "p",
      "text": "OnBoard Print & Signs is BBB A+ rated, WCB insured with $5M liability, and a member of the Sign Association of Canada (SAC) and the Manitoba Sign Association (MANSA) — so you're working with an established local shop, not a pop-up that disappears after election day."
    },
    {
      "type": "p",
      "text": "The municipal vote is October 28, 2026, and the campaigns with signs in the ground first set the tone. Call us at +1-204-869-1503 or request a free itemized quote — we'll usually have numbers back to you within about two hours so you can budget your run today and keep your campaign moving."
    },
    {
      "type": "cta",
      "to": "/products/yard-signs-winnipeg",
      "text": "Get a free election sign quote"
    }
  ],
  "faqs": [
    {
      "q": "How much do election signs cost in Winnipeg?",
      "a": "Standard 18\"x24\" double-sided coroplast lawn signs run roughly $9 to $16 each in small batches, dropping to about $5 to $7 each at 100 or more, and lower past 250. H-stakes add about $1 to $2 per sign. Free itemized quotes are usually back within about two hours."
    },
    {
      "q": "How many lawn signs does a Winnipeg ward campaign need?",
      "a": "Most municipal ward campaigns budget for 150 to 400 standard 18\"x24\" coroplast lawn signs, plus one or two large 4'x8' signs for high-traffic corners. Name recognition wins these races, so volume of small signs usually beats a few large ones."
    },
    {
      "q": "Where can I legally place election signs in Winnipeg?",
      "a": "On private property with the owner's consent only. Keep signs off public boulevards, medians, and road allowances, clear of intersection sightlines and traffic signs, and remove them promptly after election day. Always confirm current City of Winnipeg rules before placing signs."
    },
    {
      "q": "How fast can you print election signs before the October 2026 vote?",
      "a": "Because design, printing, and finishing are all done in-house in Winnipeg, rush batches can move on same-day printing or 24-hour turnaround. Ordering early still gets you the best pricing and design help, so don't wait until September."
    },
    {
      "q": "Should election signs be single or double-sided?",
      "a": "Double-sided, almost always. Voters and drivers approach lawn signs from both directions, so a single-sided sign is invisible to half of them. The small extra cost for double-sided printing is the best value in a campaign sign budget."
    }
  ],
  "relatedSlugs": [
    "large-format-printing-winnipeg",
    "new-business-signage-checklist-winnipeg"
  ]
},
  "vehicle-wrap-cost-winnipeg": {
  "title": "How Much Does a Vehicle Wrap Cost in Winnipeg? (2026)",
  "metaTitle": "Vehicle Wrap Cost Winnipeg: Real Prices (2026 Guide)",
  "metaDesc": "What does a vehicle wrap cost in Winnipeg in 2026? Real pricing from $200 decals to $5,000 full wraps, plus cost factors, lifespan, and ROI for local fleets.",
  "category": "Vehicle Wraps",
  "date": "June 17, 2026",
  "readTime": "8 min read",
  "heroImage": {
    "src": "https://images.unsplash.com/photo-1732690113224-e4230dd9a549?q=80&w=1974&auto=format&fit=crop",
    "alt": "A cargo van being fitted with a full-colour vinyl vehicle wrap inside a Winnipeg fabrication shop, installer smoothing graphics across the side panel"
  },
  "content": [
    {
      "type": "p",
      "text": "If you want the short answer on vehicle wrap cost in Winnipeg: expect to pay roughly $200 to $800 for decals and lettering, $1,000 to $2,500 for a partial wrap, and $2,500 to $5,000+ for a full wrap. Most full wraps on a standard vehicle land in the $2,500 to $3,500 range once you factor in design, premium vinyl, and professional installation."
    },
    {
      "type": "p",
      "text": "Where your project sits inside those ranges comes down to a handful of things: the size and shape of the vehicle, how much of it you're covering, the finish you choose, and how complex the artwork is. Below we break down every one of those factors with real Winnipeg numbers so you can budget with confidence instead of guessing. We fabricate and install everything in-house, so these aren't broker estimates marked up through a middleman."
    },
    {
      "type": "h2",
      "text": "Vehicle Wrap Cost in Winnipeg: Price Ranges by Coverage"
    },
    {
      "type": "p",
      "text": "The single biggest driver of price is how much of the vehicle you're covering. A few door decals is a different job than wrapping a 24-foot box truck bumper to bumper. Here's where the numbers typically fall for the Winnipeg market in 2026:"
    },
    {
      "type": "table",
      "rows": [
        [
          "Coverage Type",
          "Typical Price (CAD)",
          "Best For"
        ],
        [
          "Decals & lettering",
          "$200 - $800",
          "Logo, phone number, basic branding on doors and tailgate"
        ],
        [
          "Partial wrap",
          "$1,000 - $2,500",
          "Doors, rear quarters, and accents without full coverage"
        ],
        [
          "Full wrap (standard vehicle)",
          "$2,500 - $3,500",
          "Complete colour change or full graphic coverage on a car, SUV, or van"
        ],
        [
          "Full wrap (large vehicle)",
          "$3,500 - $5,000+",
          "Cargo vans, box trucks, and trailers with large surface areas"
        ],
        [
          "Fleet / multi-vehicle",
          "Volume discount applied",
          "3+ vehicles branded consistently"
        ]
      ]
    },
    {
      "type": "p",
      "text": "Decals and lettering are the entry point. If you just need your logo, web address, and a phone number on the doors of a work truck, you're looking at the low hundreds, not thousands. Partial wraps give you a high-impact branded look at a friendlier price by covering the most visible panels. Full wraps are the premium option that turns the entire vehicle into a moving billboard."
    },
    {
      "type": "h2",
      "text": "What Actually Drives the Price Up or Down"
    },
    {
      "type": "p",
      "text": "Two business owners can both ask for a 'full wrap' and get quotes that are $1,500 apart. That's not random. These are the variables that move the number:"
    },
    {
      "type": "bullets",
      "items": [
        {
          "bold": "Vehicle size and type",
          "text": "A compact car has far less surface area than a cargo van, box truck, or enclosed trailer. More vinyl and more install labour means a higher price. A Smart car and a 26-foot box truck are not the same job."
        },
        {
          "bold": "Coverage level",
          "text": "Decal vs. partial vs. full is the biggest single factor. Every additional panel adds material and time."
        },
        {
          "bold": "Finish",
          "text": "Standard gloss is the baseline. Matte, satin, chrome, brushed metal, and carbon-fibre textured films cost meaningfully more per square foot and can add hundreds to a full wrap."
        },
        {
          "bold": "Design complexity",
          "text": "A clean logo-and-colour layout prints and installs faster than full-bleed photographic artwork with tight registration across seams, mirrors, and door handles."
        },
        {
          "bold": "Vinyl grade",
          "text": "Premium cast vinyl conforms to curves and lasts for years; cheaper calendared vinyl is fine for flat short-term signage but shrinks and lifts on contours. We quote cast for vehicle wraps because Winnipeg weather is unforgiving."
        },
        {
          "bold": "Surface prep and old-wrap removal",
          "text": "Stripping a previous wrap, correcting paint issues, or extra cleaning adds labour. Removal of an old full wrap can add a few hundred dollars on its own."
        }
      ]
    },
    {
      "type": "h2",
      "text": "What a Proper Wrap Quote Should Include"
    },
    {
      "type": "p",
      "text": "Cheap quotes usually leave things out, then the surprises show up later. A real, itemized quote should cover the whole job from start to finish:"
    },
    {
      "type": "list",
      "items": [
        "Professional design and proofing — print-ready artwork built to fit your specific vehicle's panels, not a stretched logo",
        "Premium cast vinyl rated for the work, not budget calendared film",
        "Protective lamination over the print to guard against UV fade, road salt, and stone chips",
        "Full installation by trained installers, including removal of mirrors and trim where needed for a clean wrap",
        "Surface prep and, if applicable, removal of any existing graphics"
      ]
    },
    {
      "type": "p",
      "text": "Because we run design, fabrication, and installation under one roof, your quote reflects the actual work, not a stack of subcontractor markups. We send free, itemized quotes within about two hours so you can see exactly what you're paying for before you commit a dollar."
    },
    {
      "type": "h2",
      "text": "How Long Does a Vehicle Wrap Last in Winnipeg?"
    },
    {
      "type": "p",
      "text": "A quality wrap using premium cast vinyl and lamination lasts 5 to 7 years. That lifespan assumes proper material, professional installation, and reasonable care — which matters a lot here, because Winnipeg puts wraps through the wringer. Minus-30 winters, road salt, summer UV, and gravel all take a toll, and that's exactly why we don't cut corners on the film grade. Cheaper vinyl might save you a few hundred dollars up front and then crack, fade, or peel after a couple of prairie winters, which is the most expensive kind of savings."
    },
    {
      "type": "h2",
      "text": "The Real ROI: Why a Wrap Is the Cheapest Ad You Can Buy"
    },
    {
      "type": "p",
      "text": "Here's the part that reframes the whole conversation. A single wrapped vehicle driving Winnipeg routes — Portage, Pembina, the Perimeter, your daily job sites — generates tens of thousands of visual impressions every day. Spread a $3,000 wrap that lasts 5+ years across all those impressions and the cost-per-impression is a fraction of a cent. There is no radio spot, billboard, or social ad that competes with that math."
    },
    {
      "type": "bullets",
      "items": [
        {
          "bold": "One-time cost, years of exposure",
          "text": "Unlike monthly ad spend, you pay once and the wrap keeps working for 5 to 7 years."
        },
        {
          "bold": "Always local",
          "text": "Your van advertises to the exact Winnipeg neighbourhoods you actually serve, every single day."
        },
        {
          "bold": "Built-in credibility",
          "text": "A professionally wrapped vehicle signals an established, legitimate business — it builds trust before you ever knock on the door."
        }
      ]
    },
    {
      "type": "h2",
      "text": "Why Buy Your Wrap From OnBoard"
    },
    {
      "type": "p",
      "text": "We're a full-service Winnipeg print and signage shop, and vehicle wraps are squarely in our wheelhouse. Everything is done in-house with UL-certified fabrication, so quality and timeline stay under our control. We're BBB A+ rated, members of the Sign Association of Canada and the Manitoba Sign Association, WCB insured, and carry $5M liability — so you're covered, not exposed, when our crew is working on your vehicle."
    },
    {
      "type": "p",
      "text": "We also move fast. Same-day printing and 24-hour turnaround are available when you're up against a deadline, and because we handle design, fabrication, installation, City of Winnipeg permits, and even your web presence, you're dealing with one team end to end instead of chasing four vendors."
    },
    {
      "type": "p",
      "text": "Ready to see real numbers for your vehicle? Call us at +1-204-869-1503 or request a free, itemized quote and we'll get one back to you within about two hours — no pressure, no guesswork, just an honest price for the job."
    },
    {
      "type": "cta",
      "to": "/products/vehicle-wraps-winnipeg",
      "text": "Get a free vehicle wrap quote"
    }
  ],
  "faqs": [
    {
      "q": "How much does a full vehicle wrap cost in Winnipeg?",
      "a": "Most full wraps on a standard car, SUV, or van land between $2,500 and $3,500. Larger vehicles like cargo vans, box trucks, and trailers run $3,500 to $5,000 or more because of the extra surface area and install labour."
    },
    {
      "q": "Is a partial wrap or just decals cheaper than a full wrap?",
      "a": "Yes. Decals and lettering run $200 to $800 and partial wraps run $1,000 to $2,500, versus $2,500+ for a full wrap. A partial wrap is a popular middle ground that gives strong branding on the most visible panels for far less."
    },
    {
      "q": "How long will a vehicle wrap last in Winnipeg's climate?",
      "a": "A quality wrap made with premium cast vinyl and lamination lasts 5 to 7 years. We spec cast film specifically because Winnipeg's salt, UV, and deep-freeze winters destroy cheaper calendared vinyl far sooner."
    },
    {
      "q": "Do you offer discounts for wrapping a fleet of vehicles?",
      "a": "Yes. We apply volume discounts for multi-vehicle and fleet projects (typically three or more vehicles), and consistent branding across the fleet keeps per-vehicle design costs down too. Call us for a fleet quote."
    },
    {
      "q": "How fast can you wrap my vehicle?",
      "a": "It depends on coverage and design complexity, but we offer same-day printing and 24-hour turnaround on many jobs. Since we design, print, and install in-house, we control the timeline end to end — call +1-204-869-1503 for current scheduling."
    }
  ],
  "relatedSlugs": [
    "how-to-choose-vehicle-wrap-vinyl-winnipeg",
    "vehicle-wraps-vs-billboards-winnipeg"
  ]
},
  "banner-printing-winnipeg": {
  "title": "Banner Printing in Winnipeg: Sizes, Materials & Pricing (2026)",
  "metaTitle": "Banner Printing Winnipeg: Sizes & Pricing (2026 Guide)",
  "metaDesc": "Banner printing Winnipeg: real 2026 prices, sizes (2x4 to 4x10), vinyl vs mesh vs retractable, finishing options, and same-day rush. Free quote in ~2 hours.",
  "category": "Print",
  "date": "June 12, 2026",
  "readTime": "8 min read",
  "heroImage": {
    "src": "https://images.unsplash.com/photo-1662001234358-45b7493d2bc0?q=80&w=2070&auto=format&fit=crop",
    "alt": "Freshly printed vinyl banners with grommets and hemmed edges laid out in a Winnipeg print shop ready for pickup"
  },
  "content": [
    {
      "type": "p",
      "text": "For most jobs, banner printing in Winnipeg runs roughly $40 to $70 for a small 2x4 ft vinyl banner, $80 to $130 for a 3x6, and $150 to $250 for a full 4x8 ft outdoor banner. A retractable pull-up stand for trade shows lands around $150 to $250 complete with hardware. Mesh banners cost a little more than standard vinyl because of the specialty material. Those are real installed-and-finished numbers, not stripped-down web specials with hidden add-ons."
    },
    {
      "type": "p",
      "text": "Your final price comes down to four things: size, material weight (13oz everyday vs 18oz heavy-duty), finishing (hemmed edges, grommets, pole pockets), and turnaround. We print banners in-house here in Winnipeg, so we can quote you accurately and, when you're in a bind, turn same-day or 24-hour rush jobs without farming the work out. Below is everything you actually need to decide, plus a pricing table you can budget against."
    },
    {
      "type": "h2",
      "text": "What you'll pay for banner printing in Winnipeg (2026)"
    },
    {
      "type": "p",
      "text": "Here are realistic Winnipeg ranges for the most common banner orders in 2026. Prices assume full-colour printing on quality material with standard finishing (hemmed edges and grommets). Larger quantities bring the per-unit cost down, and design is quoted separately if you don't have print-ready artwork."
    },
    {
      "type": "table",
      "rows": [
        [
          "Banner type / size",
          "Material",
          "Rough Winnipeg price (2026)"
        ],
        [
          "2x4 ft vinyl",
          "13oz everyday",
          "$40 – $70"
        ],
        [
          "3x6 ft vinyl",
          "13oz everyday",
          "$80 – $130"
        ],
        [
          "4x8 ft vinyl",
          "13oz / 18oz",
          "$150 – $250"
        ],
        [
          "4x10 ft vinyl",
          "18oz heavy-duty",
          "$220 – $340"
        ],
        [
          "Mesh banner (per sq ft)",
          "Wind-rated mesh",
          "~10–20% above vinyl"
        ],
        [
          "Retractable / pull-up stand",
          "Stand + printed graphic",
          "$150 – $250"
        ],
        [
          "Pole flag (single-sided)",
          "Knitted polyester",
          "$120 – $200"
        ],
        [
          "Feather / teardrop flag kit",
          "Flag + pole + base",
          "$180 – $320"
        ]
      ]
    },
    {
      "type": "p",
      "text": "A few things that move the number: double-sided printing roughly adds 60 to 80 percent over single-sided; pole pockets instead of grommets are usually a small upcharge; and reinforced webbing on big outdoor banners (4x10 and up) is worth the few extra dollars in a city that gets the wind we do."
    },
    {
      "type": "h2",
      "text": "Vinyl banners: 13oz everyday vs 18oz heavy-duty"
    },
    {
      "type": "p",
      "text": "Vinyl is the workhorse. It's printed full-colour, holds bright graphics, and handles both indoor and outdoor use. The decision is really about weight, and that maps directly to how long the banner needs to survive."
    },
    {
      "type": "bullets",
      "items": [
        {
          "bold": "13oz scrim vinyl (everyday):",
          "text": "the standard choice for indoor events, short-term outdoor promos, grand openings and sales. Lighter, more affordable, and perfectly durable for weeks to a season."
        },
        {
          "bold": "18oz heavy-duty vinyl:",
          "text": "thicker, more tear-resistant, and built for long-term outdoor exposure. The right call for construction hoarding, year-round building banners, and anything that has to ride out a Winnipeg winter."
        },
        {
          "bold": "Rule of thumb:",
          "text": "if the banner lives outside for more than a few months, or it's large enough to catch real wind load, step up to 18oz. For a weekend or a storefront promo, 13oz is plenty."
        }
      ]
    },
    {
      "type": "h2",
      "text": "Mesh banners: built for wind and fences"
    },
    {
      "type": "p",
      "text": "Mesh vinyl has thousands of tiny perforations that let wind pass through instead of pushing against a solid sheet. That makes it the smart pick for fence-line banners, construction hoarding, and any large outdoor display exposed to gusts. You give up a little colour saturation and opacity compared to solid vinyl, but you gain a banner that won't sail, sag, or tear its grommets out in a prairie windstorm."
    },
    {
      "type": "p",
      "text": "Mesh runs slightly higher than standard vinyl per square foot because of the specialty material, but for big perimeter banners on chain-link it's almost always the right long-term spend."
    },
    {
      "type": "h2",
      "text": "Retractable stands, pole flags and feather flags"
    },
    {
      "type": "p",
      "text": "Not every banner hangs on a wall. For trade shows, lobbies, and recurring events, freestanding displays are easier to set up and reuse."
    },
    {
      "type": "bullets",
      "items": [
        {
          "bold": "Retractable / pull-up stands:",
          "text": "the trade-show standard. The printed graphic rolls into a self-contained base, sets up in under a minute, and packs into a carry bag. Around $150 to $250 complete, and you can reprint just the graphic later to refresh it."
        },
        {
          "bold": "Pole banners:",
          "text": "mounted on light standards or building poles, great for streetscapes, dealerships, and campus signage. Printed on weather-tough material with reinforced pole pockets."
        },
        {
          "bold": "Feather & teardrop flags:",
          "text": "tall, eye-catching, and impossible to ignore from the road. Ideal for real estate open houses, seasonal sales, and anything that needs to flag down drivers on a busy Winnipeg corridor."
        }
      ]
    },
    {
      "type": "h2",
      "text": "Common banner sizes in Winnipeg"
    },
    {
      "type": "p",
      "text": "You can print a banner at almost any dimension, but these standard sizes cover the vast majority of orders and keep costs predictable:"
    },
    {
      "type": "list",
      "items": [
        "2x4 ft — counter signs, small storefront promos, behind-the-table event banners",
        "3x6 ft — grand openings, booth backdrops, sale announcements",
        "4x8 ft — building banners, real estate, the most popular outdoor size",
        "4x10 ft — large facade banners and construction hoarding where you need impact from a distance"
      ]
    },
    {
      "type": "p",
      "text": "Not sure which size reads best from where your customers will see it? That's exactly the kind of thing we'll sort out on the quote call — viewing distance drives both the size and the minimum text height."
    },
    {
      "type": "h2",
      "text": "Finishing: hemmed edges, grommets and pole pockets"
    },
    {
      "type": "p",
      "text": "Finishing is what separates a banner that lasts from one that frays in a month. It's a small line item that makes a big difference."
    },
    {
      "type": "bullets",
      "items": [
        {
          "bold": "Hemmed edges:",
          "text": "the banner edge is folded and welded to reinforce it. This is the standard on quality banners and dramatically reduces tearing and fraying."
        },
        {
          "bold": "Grommets:",
          "text": "metal eyelets, typically every 2 to 3 feet, that give you clean, strong tie-down points for zip ties, rope, or bungees."
        },
        {
          "bold": "Pole pockets:",
          "text": "sewn sleeves at the top and/or bottom so a pole or dowel slides through — the cleaner look for hanging banners and pole displays."
        },
        {
          "bold": "Wind slits / reinforced webbing:",
          "text": "recommended on large outdoor banners to handle wind load and keep grommets from pulling through."
        }
      ]
    },
    {
      "type": "h2",
      "text": "Indoor vs outdoor durability"
    },
    {
      "type": "p",
      "text": "Indoors, a 13oz vinyl banner with UV-stable inks will look sharp for years — they're effectively a one-and-done for lobbies, gyms and event spaces. Outdoors is where material and finishing choices earn their keep. A properly finished 13oz banner handles a season of Winnipeg weather comfortably; for multi-year outdoor life, 18oz vinyl (or mesh where wind is a factor) plus reinforced grommets is the combination that holds up through freeze-thaw, sun, and wind."
    },
    {
      "type": "p",
      "text": "We print with outdoor-rated, UV-resistant inks as standard, so fading isn't the first thing that goes — the substrate and the finishing are what determine real-world lifespan."
    },
    {
      "type": "h2",
      "text": "Need it fast? Same-day and 24-hour banners"
    },
    {
      "type": "p",
      "text": "Event tomorrow? Because everything is produced in-house, we offer same-day printing and 24-hour turnaround on banners when the schedule allows. Get print-ready artwork to us early in the day and a standard vinyl banner can often be ready the same afternoon. The honest caveat: rush capacity depends on the day's queue and the complexity of the job, so call as early as you can and we'll tell you straight whether we can hit your deadline."
    },
    {
      "type": "p",
      "text": "Typical rush scenarios we handle for Winnipeg businesses: a last-minute trade-show backdrop, a grand-opening banner, a same-week real estate sign, or replacement construction hoarding after weather damage."
    },
    {
      "type": "h2",
      "text": "What businesses use banners for"
    },
    {
      "type": "list",
      "items": [
        "Grand openings and ribbon cuttings",
        "Trade shows and conference booths (retractable stands + backdrops)",
        "Construction hoarding and site fencing",
        "Seasonal and clearance sales",
        "Real estate listings and open houses",
        "Festivals, fundraisers and community events",
        "Sponsorship and arena/field signage"
      ]
    },
    {
      "type": "h2",
      "text": "Why buy your banners from OnBoard"
    },
    {
      "type": "p",
      "text": "We're a full-service Winnipeg print and signage shop, and banners are only the start. Because we run design, fabrication, installation, City of Winnipeg sign permits and even web all under one roof, you're never stuck coordinating three vendors. For larger sign projects our fabrication is UL-certified, we're WCB insured and carry $5M liability for installs, we hold an A+ rating with the BBB, and we're members of the Sign Association of Canada (SAC) and the Manitoba Sign Association (MANSA). Translation: your banner is done right, on time, and standing behind a real local team."
    },
    {
      "type": "p",
      "text": "Want a number you can budget against? Call us at +1-204-869-1503 and we'll send a free, itemized quote — usually within about two hours — so you know exactly what your banner costs before you commit."
    },
    {
      "type": "cta",
      "to": "/quote",
      "text": "Get a free banner quote"
    }
  ],
  "faqs": [
    {
      "q": "How much does a 4x8 banner cost in Winnipeg?",
      "a": "A full-colour 4x8 ft vinyl banner typically runs about $150 to $250 in Winnipeg, depending on material weight (13oz vs 18oz) and finishing. We'll send a free itemized quote, usually within about two hours."
    },
    {
      "q": "Can I get a banner printed same-day in Winnipeg?",
      "a": "Yes. Because we print in-house, we offer same-day and 24-hour turnaround on banners when our schedule allows. Send print-ready artwork early and call ahead at +1-204-869-1503 so we can confirm your deadline."
    },
    {
      "q": "What's the difference between 13oz and 18oz vinyl banners?",
      "a": "13oz is the everyday choice for indoor use and short-term outdoor promos, while 18oz is thicker, more tear-resistant, and built for long-term outdoor exposure like construction hoarding and year-round building banners."
    },
    {
      "q": "Should I choose a mesh or vinyl banner for outdoors?",
      "a": "Choose mesh for fences and windy locations — the perforations let wind pass through so the banner won't sail or tear. Choose solid vinyl when you want maximum colour saturation and the banner isn't taking heavy wind load."
    },
    {
      "q": "Do I need a permit for a banner in Winnipeg?",
      "a": "Most temporary banners on your own property are fine, but some locations, sizes, and durations trigger City of Winnipeg sign rules. We handle sign permits in-house, so we'll flag anything that needs one before you order."
    }
  ],
  "relatedSlugs": [
    "same-day-printing-winnipeg-guide",
    "large-format-printing-winnipeg"
  ]
},
  "large-format-printing-winnipeg": {
  "title": "Large Format Printing in Winnipeg: The Complete Guide (2026)",
  "metaTitle": "Large Format Printing in Winnipeg: Complete Guide (2026)",
  "metaDesc": "Your complete guide to large format printing in Winnipeg: banners, signs, vehicle graphics, materials, pricing and same-day turnaround. Get a free quote in ~2 hours.",
  "category": "Print",
  "date": "June 9, 2026",
  "readTime": "8 min read",
  "heroImage": {
    "src": "https://images.unsplash.com/photo-1627815416399-ddaae0e2fa54?q=80&w=2070&auto=format&fit=crop",
    "alt": "Wide format printer producing a large vinyl banner inside a Winnipeg print and signage shop"
  },
  "content": [
    {
      "type": "p",
      "text": "Large format printing in Winnipeg covers anything bigger than a standard office printer can handle: think banners, posters, backlit signs, window and wall graphics, trade-show displays, vehicle wraps and rigid yard signs. For most Winnipeg businesses, a basic vinyl banner runs roughly $7-$12 per square foot, coroplast yard signs land around $25-$45 each depending on size and quantity, and a full vehicle wrap typically falls between $2,800 and $4,500 installed. Rush and same-day work is available when you're up against a deadline."
    },
    {
      "type": "p",
      "text": "The short version: if you need something printed bigger than a sheet of paper and you need it to look sharp from across a parking lot or a trade-show floor, that's wide format printing. Because we run fabrication, installation and City of Winnipeg sign permits in-house, we can quote, print and often install without bouncing your job between three different vendors. Free itemized quotes come back in about two hours, and 24-hour turnaround (or same-day on simpler jobs) is on the table when the timeline is tight."
    },
    {
      "type": "h2",
      "text": "What Is Large Format Printing (and When Do You Actually Need It)?"
    },
    {
      "type": "p",
      "text": "Large format printing in Winnipeg, also called wide format printing, refers to any print job produced on printers built for materials wider than about 24 inches, scaling all the way up to full building banners and vehicle-sized graphics. Instead of toner on paper, these machines lay down weather-resistant inks on vinyl, fabric, rigid board and more. The result is large, high-impact graphics that hold up indoors and outdoors."
    },
    {
      "type": "p",
      "text": "You need it the moment a regular print shop says \"that's too big.\" Common triggers we see from Winnipeg business owners:"
    },
    {
      "type": "bullets",
      "items": [
        {
          "bold": "You're opening or rebranding",
          "text": "and need storefront signage, window graphics and a banner for the grand opening."
        },
        {
          "bold": "You're exhibiting at a trade show",
          "text": "like a RBC Convention Centre event and need retractable banners and a backdrop."
        },
        {
          "bold": "You run a vehicle or fleet",
          "text": "and want your trucks or vans working as moving billboards across the city."
        },
        {
          "bold": "You're a contractor or realtor",
          "text": "needing coroplast yard signs, A-frames and site hoarding."
        },
        {
          "bold": "You're running a promotion",
          "text": "and need posters, point-of-sale graphics and a street-facing banner fast."
        }
      ]
    },
    {
      "type": "h2",
      "text": "Large Format Product Types: A Quick Overview"
    },
    {
      "type": "p",
      "text": "Here's a straight overview of the most common large format products, the material they're usually printed on, and what each one is best for. Use it as a starting point, then we'll match the exact spec to your job when you request a quote."
    },
    {
      "type": "table",
      "rows": [
        [
          "Product",
          "Typical Material",
          "Best Use"
        ],
        [
          "Vinyl banners",
          "13oz scrim vinyl",
          "Events, grand openings, outdoor promos"
        ],
        [
          "Posters & prints",
          "Photo / poster paper",
          "Indoor displays, point-of-sale, art"
        ],
        [
          "Backlit signs",
          "Translucent backlit film",
          "Light boxes, illuminated storefront signs"
        ],
        [
          "Window & wall graphics",
          "Adhesive vinyl, perforated film",
          "Storefront branding, privacy, murals"
        ],
        [
          "Trade-show graphics",
          "Tension fabric, retractable vinyl",
          "Booths, backdrops, pop-up displays"
        ],
        [
          "Vehicle graphics",
          "Cast wrap vinyl",
          "Wraps, decals, fleet branding"
        ],
        [
          "Yard & rigid signs",
          "Coroplast, Alupanel (ACM), PVC",
          "Real estate, lawns, directional, A-frames"
        ]
      ]
    },
    {
      "type": "h2",
      "text": "Substrates: What Your Graphic Is Actually Printed On"
    },
    {
      "type": "p",
      "text": "The material matters as much as the artwork. Choosing the right substrate is the difference between a sign that survives a Manitoba winter and one that curls by February. Here's what we print on most and where each one shines:"
    },
    {
      "type": "bullets",
      "items": [
        {
          "bold": "Coroplast",
          "text": "lightweight corrugated plastic. Cheap, weatherproof, perfect for yard signs and short-term outdoor use."
        },
        {
          "bold": "Foamcore",
          "text": "rigid foam board for indoor displays, presentation boards and event signage. Not for outdoor use."
        },
        {
          "bold": "Alupanel / ACM",
          "text": "aluminum composite panel. Rigid, premium and built to last years outdoors. Ideal for permanent storefront and building signs."
        },
        {
          "bold": "Rigid PVC",
          "text": "durable plastic board that handles indoor and sheltered outdoor signage with a clean, solid finish."
        },
        {
          "bold": "Vinyl",
          "text": "the workhorse. Scrim vinyl for banners, adhesive vinyl for windows and walls, cast vinyl for vehicle wraps."
        },
        {
          "bold": "Fabric",
          "text": "tension and dye-sublimated fabric for trade-show displays. Wrinkle-resistant, packs small, looks high-end."
        }
      ]
    },
    {
      "type": "h2",
      "text": "File Prep: How to Send Art That Prints Sharp at Full Size"
    },
    {
      "type": "p",
      "text": "Most reprints and delays come down to file problems, not printing problems. Get these right and your job moves faster:"
    },
    {
      "type": "bullets",
      "items": [
        {
          "bold": "Vector beats raster for logos and text",
          "text": "vector art (AI, EPS, PDF) scales to any size with zero blur. Use it for anything with crisp edges or type."
        },
        {
          "bold": "Mind your DPI at actual size",
          "text": "aim for 100-150 DPI at the final print size for large signs viewed up close, and 72-100 DPI for big banners viewed from a distance. A 4-foot banner needs a much larger file than a letter-size flyer."
        },
        {
          "bold": "Add bleed",
          "text": "extend your background 0.25\" past the edge so trimming doesn't leave a white sliver."
        },
        {
          "bold": "Build in CMYK, not RGB",
          "text": "screens use RGB; printers use CMYK. Convert early so the colour you approve is the colour you get. For brand-critical reds and blues, send a Pantone reference."
        },
        {
          "bold": "Outline your fonts",
          "text": "or include the font files, so your text doesn't reflow on our end."
        }
      ]
    },
    {
      "type": "p",
      "text": "Not a designer? That's fine. Because we're end-to-end, our team can build print-ready artwork from your logo or a rough idea, and even handle the web and digital side so your branding is consistent everywhere."
    },
    {
      "type": "h2",
      "text": "Finishing & Mounting"
    },
    {
      "type": "p",
      "text": "Finishing is what turns a printed sheet into a finished sign that hangs straight and lasts. Depending on the product, that can include:"
    },
    {
      "type": "list",
      "items": [
        "Grommets and hemmed edges on banners for clean, tear-resistant hanging points",
        "Lamination to protect against UV fade, scratches and moisture (key for floor and outdoor graphics)",
        "Pole pockets and wind slits for banners exposed to Winnipeg's wind",
        "Mounting to rigid substrates like Alupanel, PVC or foamcore",
        "Contour cutting for custom shapes, decals and lettering",
        "Professional installation, including permitted exterior signage fabricated to UL-certified standards"
      ]
    },
    {
      "type": "h2",
      "text": "Turnaround: Standard, Rush and Same-Day"
    },
    {
      "type": "p",
      "text": "Timeline is usually the real question. Standard large format jobs typically turn around in 2-4 business days once artwork is approved. When you're in a bind, 24-hour rush and same-day printing are available on many products, banners, posters and coroplast signs being the easiest to fast-track. Complex jobs like vehicle wraps or permitted exterior signs take longer because of fabrication and City of Winnipeg permit timelines, but we manage that whole process for you in-house so there's no chasing separate trades."
    },
    {
      "type": "p",
      "text": "Want exact numbers for your specific job? Send us your sizes, quantities and deadline and we'll send back a free, itemized quote in about two hours. Call +1-204-869-1503 or request a quote online, and we'll handle it from design to install."
    },
    {
      "type": "cta",
      "to": "/quote",
      "text": "Get a free quote"
    }
  ],
  "faqs": [
    {
      "q": "How much does large format printing cost in Winnipeg?",
      "a": "It depends on size, material and quantity, but vinyl banners typically run about $7-$12 per square foot, coroplast yard signs around $25-$45 each, and full vehicle wraps roughly $2,800-$4,500 installed. We send free itemized quotes within about two hours."
    },
    {
      "q": "Do you offer same-day or rush printing?",
      "a": "Yes. 24-hour and same-day printing is available on many products like banners, posters and coroplast signs once your artwork is approved. Call us at +1-204-869-1503 with your deadline and we'll tell you what's possible."
    },
    {
      "q": "What file format should I send for large format printing?",
      "a": "Send vector files (AI, EPS or print-ready PDF) for logos and text, built in CMYK with 0.25\" bleed. For photos, supply 100-150 DPI at the final print size. No print-ready file? We can build the artwork for you."
    },
    {
      "q": "Do you handle sign permits in Winnipeg?",
      "a": "Yes. We manage City of Winnipeg sign permits in-house as part of our end-to-end service, along with UL-certified fabrication and professional installation, so you don't have to coordinate separate trades or the permit process yourself."
    },
    {
      "q": "What's the difference between large format and wide format printing?",
      "a": "They mean the same thing. Both refer to printing on materials wider than a standard printer can handle, from banners and posters to vehicle-sized graphics, on substrates like vinyl, coroplast, fabric and aluminum panel."
    }
  ],
  "relatedSlugs": [
    "banner-printing-winnipeg",
    "same-day-printing-winnipeg-guide"
  ]
},
  'led-channel-letter-sign-cost-winnipeg': {
    title: 'How Much Does an LED Channel Letter Sign Cost in Winnipeg?',
    metaTitle: 'How Much Does an LED Channel Letter Sign Cost in Winnipeg? (2026 Guide)',
    metaDesc: 'LED channel letter sign costs in Winnipeg range from $5,000–$15,000+ depending on size, lighting, and installation. This guide breaks down every cost factor — no surprises.',
    category: 'Signs',
    date: 'March 15, 2026',
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
      { type: 'p', text: 'Note: These ranges reflect the Winnipeg market in 2026. Prices vary based on material costs, design complexity, and installation conditions. Always get an itemized quote.' },
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
    date: 'March 8, 2026',
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
    metaTitle: 'The Complete Guide to Getting a Sign Permit in Winnipeg (2026)',
    metaDesc: 'Most Winnipeg businesses need a permit before installing any exterior sign. This guide explains who needs one, what\'s required, and how OnBoard handles the entire process for you.',
    category: 'Permits',
    date: 'February 28, 2026',
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
    date: 'February 20, 2026',
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
    date: 'February 12, 2026',
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
    date: 'February 5, 2026',
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
    date: 'January 28, 2026',
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
    metaDesc: 'Your storefront sign gets people through the door. Your website gets them to find you first. Here\'s why Winnipeg businesses can\'t afford to choose one over the other in 2026.',
    category: 'Web Development',
    date: 'January 20, 2026',
    readTime: '5 min read',
    heroImage: { src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=80&auto=format&fit=crop', alt: 'Custom business website displayed on a laptop — web design and development for Winnipeg small businesses' },
    content: [
      { type: 'p', text: 'You spent $8,000 on a stunning LED channel letter sign. It looks incredible at night. People drive by and notice it. And then — they pull out their phone and Google your business name. What do they find? If the answer is "not much," or worse, "a competitor\'s website," you\'ve lost the customer that your sign just captured. Physical signage and a professional website aren\'t two separate investments. They\'re two halves of the same first impression.' },
      { type: 'h2', text: 'The Way Customers Actually Find Businesses in 2026' },
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
    case 'cta':
      return (
        <Link key={i} to={block.to} className="inline-flex items-center gap-2 mt-4 mb-2 px-7 py-3.5 font-heading font-semibold text-white no-underline" style={{ backgroundColor: '#E63B2E', borderRadius: '2rem' }}>
          {block.text} <ArrowRight size={16} />
        </Link>
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
