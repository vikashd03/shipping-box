/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderColor: {
        DEFAULT: "#000000",
      },
    },
  },
  plugins: [],
  corePlugins: {
    // preflight: false,
  },
};
