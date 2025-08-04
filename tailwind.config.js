/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // ← App Router files
    "./pages/**/*.{js,ts,jsx,tsx}", // ← Optional, for Pages Router
    "./components/**/*.{js,ts,jsx,tsx}", // ← Your UI components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
