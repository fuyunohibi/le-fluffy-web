import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // DOG
        blue: {
          100: "#d0e7ff", // Cooler and darker blue for the background
          200: "#91bfff", // Darker blue for the border
        },
        // CAT
        pink: {
          100: "#f9e1de", // Cooler and darker pink for the background
          200: "#f5b8b0", // Darker pink for the border
        },
        // BIRD
        cream: {
          100: "#f6e7b8", // Cooler and darker cream for the background
          200: "#f3ca73", // Darker cream for the border
        },
        // RABBIT
        green: {
          100: "#d7f0d3", // Cooler and darker green for the background
          200: "#9ce27e", // Darker green for the border
        },
        // REPTILE
        teal: {
          // Chose a teal shade to represent reptiles
          100: "#c2eae3", // Cooler and darker teal for the background
          200: "#66d4c7", // Darker teal for the border
        },
      },
    },
  },
  plugins: [],
};
export default config;
