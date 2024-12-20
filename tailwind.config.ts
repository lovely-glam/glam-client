import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      fontFamily: {
        'be-vietnam': ['var(--font-be-vietnam)', 'sans-serif'],
      }
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        glam: {
          primary: '#A23D3D',
          secondary: '#ffe4e6',
          accent: '#e5e7eb',
          neutral: '#000000',
          'base-100': '#ffffff',
          info: '#60a5fa',
          success: '#4ade80',
          warning: '#fde047',
          error: '#ef4444',
        },
      },
    ],
  },
};
export default config;
