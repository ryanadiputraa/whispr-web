import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        text: '#130e01',
        'text-dark': '#fef9ec',
        background: '#e7e7e4',
        'background-dark': '#1b1b18',
        primary: '#0042db',
        'primary-dark': '#2465ff',
        secondary: '#d2d0d0',
        'secondary-dark': '#2f2d2d',
        accent: '#005475',
        'accent-dark': '#8adeff',
      },
    },
  },
  plugins: [],
};
export default config;
