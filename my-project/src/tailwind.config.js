// tailwind.config.js
const scrollbar = require('tailwind-scrollbar');

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        "yt-black": "#0F0F0F",
        "yt-red": "#FF0300",
        "yt-white": "#F1F1F1",
        "yt-light-black": "#272727",
        "yt-light": "#181818",
        "yt-light-1": "#212121",
        "yt-gray": "gray",
      },
      gridTemplateColumns: {
        yt: "repeat(auto-fit,minmax(250px,1fr))",
      },
    },
  },
  plugins: [scrollbar],
};

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // adjust path if needed
  theme: {
    extend: {
      gridTemplateColumns: {
        yt: "repeat(auto-fill, minmax(260px, 1fr))", // Custom YouTube-style grid
      },
    },
  },
  plugins: [],
};