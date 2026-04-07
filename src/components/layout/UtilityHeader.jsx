import { Phone, FileText, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function UtilityHeader() {
  return (
    <div
      className="absolute top-0 left-0 w-full z-50 pt-3 pb-12 px-6 md:px-12"
      style={{ background: 'linear-gradient(to bottom, rgba(17,17,17,0.7) 0%, rgba(17,17,17,0) 100%)' }}
    >
      <div
        className="max-w-7xl mx-auto flex items-center justify-between text-xs font-data tracking-wider"
        style={{ color: '#E8E4DD99' }}
      >
      <div className="flex items-center gap-6">
        <a
          href="tel:+12048691503"
          className="flex items-center gap-2 link-lift transition-colors duration-300 hover:text-white"
        >
          <Phone size={12} strokeWidth={2.5} className="text-accent" />
          <span>+1-204-869-1503</span>
        </a>
        <div className="hidden md:flex items-center gap-2">
          <MapPin size={12} strokeWidth={2.5} className="text-accent" />
          <span>205 Lucas Ave #118, Winnipeg</span>
        </div>
      </div>
      <div className="hidden sm:flex items-center gap-5">
        <Link
          to="/quote"
          className="flex items-center gap-1.5 link-lift transition-colors duration-300 hover:text-white"
        >
          <FileText size={12} /> Request a Quote
        </Link>
      </div>
      </div>
    </div>
  );
}
