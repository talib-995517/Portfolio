// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // custom project color used in components
        'theme-yellow': {
          DEFAULT: '#f6e05e', // tailwind default-like yellow
          '500': '#f6e05e',
          '600': '#d69e2e',
        },
        'theme-red': {
          DEFAULT: '#ef4444',
          '500': '#ef4444',
          '600': '#dc2626',
        },
      },
    },
  },
  plugins: [],
}