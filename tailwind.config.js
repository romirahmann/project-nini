/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
    colors: {
      primary: "#0F1740",
      secondary: "#EBCF1A",
    },
    fontFamily: {
      sans: ["Poppins", "Ubuntu", "Sans-serif"],
    },
  },
  plugins: [require("flowbite/plugin")],
};
