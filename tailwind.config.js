/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f6f7f6",
          100: "#e3e5e2",
          200: "#c6cac5",
          300: "#a0a8a0",
          400: "#7c857c",
          500: "#626a62",
          600: "#4e544d",
          700: "#404540",
          800: "#353935",
          900: "#2f322f",
          950: "#181b18",
        },
        secondary: "#00FFB7",
      },
    },
  },
  plugins: [],
};
