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
        'secondary-dark': '#716e6e',
        accent: '#005475',
        'accent-transparent': 'rgb(0 84 117 / 50%)',
        'accent-dark': '#8adeff',
        'accent-dark-transparent': 'rgb(138 222 255 / 50%)',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
export default config;
