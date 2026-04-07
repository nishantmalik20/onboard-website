/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E8E4DD',
        accent: '#E63B2E',
        background: '#F5F3EE',
        dark: '#111111',
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
        drama: ['"DM Serif Display"', 'serif'],
        data: ['"Space Mono"', 'monospace'],
      },
      borderRadius: {
        '2xl-custom': '2rem',
        '3xl-custom': '3rem',
        '4xl-custom': '4rem',
      },
    },
  },
  plugins: [],
}
