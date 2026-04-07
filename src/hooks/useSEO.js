import { useEffect } from 'react';

/**
 * Sets document title and meta description for each page.
 * In a React SPA without react-helmet, this is the most reliable
 * way to give each route unique SEO signals for crawlers that
 * execute JavaScript (Googlebot, Bingbot, GPTBot).
 */
export default function useSEO({ title, description, canonical }) {
  useEffect(() => {
    // Title
    if (title) {
      document.title = title;
    }

    // Meta description
    if (description) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'description');
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', description);
    }

    // Canonical URL
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', canonical);
    }

    // OG title
    if (title) {
      let og = document.querySelector('meta[property="og:title"]');
      if (og) og.setAttribute('content', title);
    }

    // OG description
    if (description) {
      let og = document.querySelector('meta[property="og:description"]');
      if (og) og.setAttribute('content', description);
    }

    // OG URL
    if (canonical) {
      let og = document.querySelector('meta[property="og:url"]');
      if (og) og.setAttribute('content', canonical);
    }
  }, [title, description, canonical]);
}
