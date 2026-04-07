import { useState, useRef, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, Menu, X, ChevronDown } from 'lucide-react';

const productsDropdown = [
  { label: 'LED Channel Letter Signs', tagline: 'Illuminate your storefront, day and night', slug: '/products/led-channel-letter-signs-winnipeg' },
  { label: 'Vehicle Wraps', tagline: 'Turn every drive into a brand impression', slug: '/products/vehicle-wraps-winnipeg' },
  { label: 'Custom Wallpaper', tagline: 'Transform any wall into a brand statement', slug: '/products/custom-wallpaper-winnipeg' },
  { label: 'Window Graphics', tagline: 'Bold visuals that start at the storefront', slug: '/products/window-graphics-winnipeg' },
  { label: 'Yard Signs', tagline: 'Durable, eye-catching, ready fast', slug: '/products/yard-signs-winnipeg' },
  { label: 'Business Cards & Flyers', tagline: 'Premium print that leaves a lasting impression', slug: '/products/business-cards-flyers-winnipeg' },
  { label: 'Marketing Apparel', tagline: 'Custom branded apparel and promotional products', slug: '/products/marketing-apparel-winnipeg' },
];

const servicesDropdown = [
  { label: 'Sign Design', tagline: 'Concepts, 3D renders, and permit-ready drawings', slug: '/services/sign-design-winnipeg' },
  { label: 'Manufacturing & Fabrication', tagline: 'UL-certified, built in-house, built to last', slug: '/services/sign-manufacturing-winnipeg' },
  { label: 'Installation & Maintenance', tagline: 'Bucket trucks, licensed operators, city-compliant', slug: '/services/installation-maintenance-winnipeg' },
  { label: 'Permits & Electrical', tagline: 'We handle the paperwork, bylaws, and inspections', slug: '/services/permits-winnipeg' },
  { label: 'Website & App Development', tagline: 'Your digital storefront, as polished as your sign', slug: '/services/website-application-development' },
];

const blogDropdown = [
  { title: 'How Much Does an LED Channel Letter Sign Cost in Winnipeg?', excerpt: 'Real price ranges, hidden costs, and what to ask before you sign any quote.', category: 'Signs', slug: '/blog/led-channel-letter-sign-cost-winnipeg' },
  { title: 'Vehicle Wraps vs. Billboards: Which Gives Better ROI?', excerpt: 'A wrapped van generates up to 70,000 impressions daily at a fraction of billboard cost.', category: 'Vehicle Wraps', slug: '/blog/vehicle-wraps-vs-billboards-winnipeg' },
  { title: 'The Complete Guide to Sign Permits in Winnipeg', excerpt: 'Who needs one, what\'s required, and how we handle the entire process for you.', category: 'Permits', slug: '/blog/sign-permit-guide-winnipeg' },
  { title: 'Opening a New Business? Your Complete Signage Checklist', excerpt: 'Everything a new Winnipeg business needs to think about for signage — timelines, budgets, priorities.', category: 'Business Tips', slug: '/blog/new-business-signage-checklist-winnipeg' },
];

function DropdownPanel({ items, hubLink, hubLabel, columns, width, onNavigate }) {
  return (
    <div
      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-background/95 backdrop-blur-xl border border-primary/30 shadow-xl p-5"
      style={{ borderRadius: '1.25rem', width, zIndex: 60 }}
    >
      <div className={`grid gap-2 ${columns === 3 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2'}`}>
        {items.map((item) => (
          <button
            key={item.slug}
            onClick={() => onNavigate(item.slug)}
            className="group flex flex-col gap-0.5 p-3 text-left bg-transparent border-none cursor-pointer transition-colors duration-200 hover:bg-primary/20"
            style={{ borderRadius: '0.75rem' }}
          >
            <span className="flex items-center gap-2 text-sm font-heading font-semibold" style={{ color: '#111111' }}>
              {item.label}
              <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ color: '#E63B2E' }} />
            </span>
            <span className="text-xs font-heading" style={{ color: '#666666' }}>{item.tagline}</span>
          </button>
        ))}
      </div>
      <div className="mt-3 pt-3 border-t border-primary/20">
        <button
          onClick={() => onNavigate(hubLink)}
          className="flex items-center gap-1.5 text-sm font-heading font-semibold bg-transparent border-none cursor-pointer transition-colors duration-200"
          style={{ color: '#E63B2E' }}
        >
          {hubLabel} <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const closeTimer = useRef(null);

  const navItems = [
    { label: 'Products', to: '/products', hasDropdown: true },
    { label: 'Services', to: '/services', hasDropdown: true },
    { label: 'Blog', to: '/blog', hasDropdown: true },
    { label: 'Portfolio', to: '/portfolio' },
    { label: 'About Us', to: '/about' },
    { label: 'Contact Us', to: '/contact' },
  ];

  const handleNavClick = (item) => {
    setMobileOpen(false);
    setMobileExpanded(null);
    navigate(item.to);
  };

  const handleDropdownNavigate = useCallback((path) => {
    setOpenDropdown(null);
    setMobileOpen(false);
    setMobileExpanded(null);
    navigate(path);
  }, [navigate]);

  const handleMouseEnter = useCallback((label) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenDropdown(label);
  }, []);

  const handleMouseLeave = useCallback(() => {
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 150);
  }, []);

  const toggleMobileAccordion = (label) => {
    setMobileExpanded((prev) => (prev === label ? null : label));
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  return (
    <nav
      aria-label="Main navigation"
      className="fixed top-8 md:top-12 left-1/2 -translate-x-1/2 z-50 px-5 md:px-10 py-2.5 md:py-4 flex items-center gap-8 bg-background/80 backdrop-blur-xl border border-primary/30 shadow-lg"
      style={{ borderRadius: '3rem', width: 'min(94vw, 1280px)' }}
    >
      <a href="/" onClick={handleLogoClick} className="flex-shrink-0">
        <img
          src="/onboard_logo.svg"
          alt="OnBoard Print & Signs"
          width={200}
          height={52}
          className="transition-all duration-500"
          style={{
            height: 'clamp(24px, 3.5vw, 32px)',
            width: 'auto',
            filter: 'none',
          }}
        />
      </a>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-6 ml-auto">
        {navItems.map((item) =>
          item.hasDropdown ? (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => handleMouseEnter(item.label)}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => handleNavClick(item)}
                aria-haspopup="true"
                aria-expanded={openDropdown === item.label}
                className="link-lift text-sm font-heading font-medium transition-colors duration-300 bg-transparent border-none cursor-pointer flex items-center gap-1"
                style={{ color: '#111111' }}
              >
                {item.label}
                <ChevronDown
                  size={13}
                  className="transition-transform duration-200"
                  style={{ transform: openDropdown === item.label ? 'rotate(180deg)' : 'rotate(0deg)' }}
                />
              </button>
              <div
                className="transition-all duration-200"
                style={{
                  opacity: openDropdown === item.label ? 1 : 0,
                  pointerEvents: openDropdown === item.label ? 'auto' : 'none',
                  transform: openDropdown === item.label ? 'translateY(0)' : 'translateY(-8px)',
                }}
              >
                {item.label === 'Products' && (
                  <DropdownPanel
                    items={productsDropdown}
                    hubLink="/products"
                    hubLabel="View All Products"
                    columns={3}
                    width="600px"
                    onNavigate={handleDropdownNavigate}
                  />
                )}
                {item.label === 'Services' && (
                  <DropdownPanel
                    items={servicesDropdown}
                    hubLink="/services"
                    hubLabel="View All Services"
                    columns={2}
                    width="480px"
                    onNavigate={handleDropdownNavigate}
                  />
                )}
                {item.label === 'Blog' && (
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-background/95 backdrop-blur-xl border border-primary/30 shadow-xl p-5"
                    style={{ borderRadius: '1.25rem', width: '560px', zIndex: 60 }}
                  >
                    <div className="flex flex-col gap-2">
                      {blogDropdown.map((post) => (
                        <button
                          key={post.slug}
                          onClick={() => handleDropdownNavigate(post.slug)}
                          className="group flex flex-col gap-1 p-3 text-left bg-transparent border-none cursor-pointer transition-colors duration-200 hover:bg-primary/20"
                          style={{ borderRadius: '0.75rem' }}
                        >
                          <span className="font-data text-[10px] tracking-widest uppercase" style={{ color: '#E63B2E' }}>{post.category}</span>
                          <span className="flex items-center gap-2 text-sm font-heading font-semibold leading-snug" style={{ color: '#111111' }}>
                            <span className="line-clamp-2">{post.title}</span>
                            <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0" style={{ color: '#E63B2E' }} />
                          </span>
                          <span className="text-xs font-heading line-clamp-1" style={{ color: '#666666' }}>{post.excerpt}</span>
                        </button>
                      ))}
                    </div>
                    <div className="mt-3 pt-3 border-t border-primary/20">
                      <button
                        onClick={() => handleDropdownNavigate('/blog')}
                        className="flex items-center gap-1.5 text-sm font-heading font-semibold bg-transparent border-none cursor-pointer transition-colors duration-200"
                        style={{ color: '#E63B2E' }}
                      >
                        View All Posts <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <button
              key={item.label}
              onClick={() => handleNavClick(item)}
              className="link-lift text-sm font-heading font-medium transition-colors duration-300 bg-transparent border-none cursor-pointer"
              style={{ color: '#111111' }}
            >
              {item.label}
            </button>
          )
        )}
        <Link
          to="/quote"
          className="btn-magnetic inline-flex items-center gap-2 px-5 py-2.5 text-sm font-heading font-semibold text-white"
          style={{ backgroundColor: '#E63B2E', borderRadius: '2rem' }}
        >
          <span className="btn-bg" style={{ backgroundColor: '#111111' }}></span>
          <span className="btn-text flex items-center gap-2">Get a Quote <ArrowRight size={14} /></span>
        </Link>
      </div>

      {/* Mobile hamburger */}
      <button
        className="md:hidden ml-auto bg-transparent border-none cursor-pointer"
        onClick={() => setMobileOpen(!mobileOpen)}
        style={{ color: '#111111' }}
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {mobileOpen && (
        <div
          className="absolute top-full left-0 right-0 mt-2 p-6 flex flex-col gap-2 bg-background/95 backdrop-blur-xl border border-primary/30 md:hidden"
          style={{ borderRadius: '2rem', maxHeight: '80vh', overflowY: 'auto' }}
        >
          {navItems.map((item) =>
            item.hasDropdown ? (
              <div key={item.label}>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleNavClick(item)}
                    className="text-dark font-heading font-medium bg-transparent border-none cursor-pointer text-left flex-1 py-1.5"
                  >
                    {item.label}
                  </button>
                  <button
                    onClick={() => toggleMobileAccordion(item.label)}
                    className="bg-transparent border-none cursor-pointer p-1.5"
                    style={{ color: '#111111' }}
                    aria-label={`Expand ${item.label} submenu`}
                  >
                    <ChevronDown
                      size={16}
                      className="transition-transform duration-200"
                      style={{ transform: mobileExpanded === item.label ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    />
                  </button>
                </div>
                {mobileExpanded === item.label && (
                  <div className="flex flex-col gap-1 pl-3 pt-1 pb-2">
                    {item.label === 'Blog' ? (
                      <>
                        {blogDropdown.map((post) => (
                          <button
                            key={post.slug}
                            onClick={() => handleDropdownNavigate(post.slug)}
                            className="flex flex-col gap-0 py-2 px-3 text-left bg-transparent border-none cursor-pointer transition-colors duration-200 hover:bg-primary/20"
                            style={{ borderRadius: '0.5rem' }}
                          >
                            <span className="font-data text-[10px] tracking-widest uppercase" style={{ color: '#E63B2E' }}>{post.category}</span>
                            <span className="text-sm font-heading font-semibold" style={{ color: '#111111' }}>{post.title}</span>
                          </button>
                        ))}
                        <button
                          onClick={() => handleDropdownNavigate('/blog')}
                          className="flex items-center gap-1 py-2 px-3 text-sm font-heading font-semibold bg-transparent border-none cursor-pointer"
                          style={{ color: '#E63B2E' }}
                        >
                          View All Posts <ArrowRight size={13} />
                        </button>
                      </>
                    ) : (
                      <>
                        {(item.label === 'Products' ? productsDropdown : servicesDropdown).map((sub) => (
                          <button
                            key={sub.slug}
                            onClick={() => handleDropdownNavigate(sub.slug)}
                            className="flex flex-col gap-0 py-2 px-3 text-left bg-transparent border-none cursor-pointer transition-colors duration-200 hover:bg-primary/20"
                            style={{ borderRadius: '0.5rem' }}
                          >
                            <span className="text-sm font-heading font-semibold" style={{ color: '#111111' }}>{sub.label}</span>
                            <span className="text-xs font-heading" style={{ color: '#666666' }}>{sub.tagline}</span>
                          </button>
                        ))}
                        <button
                          onClick={() => handleDropdownNavigate(item.to)}
                          className="flex items-center gap-1 py-2 px-3 text-sm font-heading font-semibold bg-transparent border-none cursor-pointer"
                          style={{ color: '#E63B2E' }}
                        >
                          View All {item.label} <ArrowRight size={13} />
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <button
                key={item.label}
                onClick={() => handleNavClick(item)}
                className="text-dark font-heading font-medium bg-transparent border-none cursor-pointer text-left py-1.5"
              >
                {item.label}
              </button>
            )
          )}
          <Link
            to="/quote"
            className="btn-magnetic inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-heading font-semibold text-white mt-2"
            style={{ backgroundColor: '#E63B2E', borderRadius: '2rem' }}
            onClick={() => setMobileOpen(false)}
          >
            <span className="btn-text flex items-center gap-2">Get a Quote <ArrowRight size={14} /></span>
          </Link>
        </div>
      )}
    </nav>
  );
}
