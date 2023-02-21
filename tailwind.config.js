/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      fontFamily: {
        noto: ["Noto Sans Bengali"],
        siliguri: ["Hind Siliguri"],
      },
      screens: {
        mobile: "480px",
        tablet: "768px",
        laptop: "1024px",
        desktop: "1200px",
        large: "1400px",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    // ...
  ],
};
