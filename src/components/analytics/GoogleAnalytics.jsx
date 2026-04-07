import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Fires a page_view event into GTM's dataLayer on every SPA navigation
export default function GoogleAnalytics() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window.dataLayer === 'undefined') return;
    window.dataLayer.push({
      event: 'page_view',
      page_path: location.pathname + location.search,
      page_title: document.title,
    });
  }, [location]);

  return null;
}
