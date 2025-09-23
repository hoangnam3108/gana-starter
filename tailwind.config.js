// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      padding: {
        '9/16': '56.25%', // Tỷ lệ 16:9
      },
    },
  },
  plugins: [],
}