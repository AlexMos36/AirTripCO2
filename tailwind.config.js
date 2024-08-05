// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"], // Ensure this is correctly set
  theme: {
    extend: {
      backgroundImage: {
        "custom-bg": "url('../src/assets/background-img.webp')",
      },
      keyframes: {
        bounceInFromBottom: {
          "0%": { transform: "translateY(-60vh)" },
          "20%": { transform: "translateY(50px)" },
          "30%": { transform: "translateY(-30px)" },
          "40%": { transform: "translateY(30px)" },
          "50%": { transform: "translateY(-15px)" },
          "60%": { transform: "translateY(10px)" },
          "70%": { transform: "translateY(-5px)" },
          "80%": { transform: "translateY(5px)" },
          "90%": { transform: "translateY(0px)" },
          "100%": { transform: "translateY(0)" },
        },
        growFromDot: {
          "0%": { transform: "scale(0)", opacity: 0 },
          // "50%": { transform: "scale(0.9)", opacity: 1 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
      },
      animation: {
        bounceInFromBottom: "bounceInFromBottom 4s ease-in-out",
        growFromDot: "growFromDot 1s ease-in-out",
      },
    },
  },
  variants: {},
  plugins: [],
};
