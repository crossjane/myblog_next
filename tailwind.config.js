// tailwind.config.js

const tailwindConfig = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        josefin: ["Josefin Slab", "serif"],
      },
    },
  },
  plugins: [],
};

export default tailwindConfig;
