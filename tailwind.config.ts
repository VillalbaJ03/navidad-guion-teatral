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
        // Paleta navideña elegante
        christmas: {
          green: {
            50: "#f0f7f4",
            100: "#dcebe3",
            200: "#bbd8ca",
            300: "#8ebda8",
            400: "#5e9c82",
            500: "#3d7f66",
            600: "#2d6652",
            700: "#1e4a3a", // Verde oscuro principal
            800: "#1a3d31",
            900: "#16332a",
          },
          gold: {
            50: "#fefcf3",
            100: "#fdf8e1",
            200: "#faefc3",
            300: "#f6e19a",
            400: "#f0ce6a",
            500: "#e8b93d", // Dorado principal
            600: "#d49d24",
            700: "#b17a1d",
            800: "#90601f",
            900: "#764f1d",
          },
          cream: {
            50: "#fdfbf7",
            100: "#faf5eb", // Crema principal
            200: "#f3e8d3",
            300: "#e9d5b5",
            400: "#dcbc8e",
            500: "#d0a36d",
            600: "#c18a54",
            700: "#a17046",
            800: "#835b3e",
            900: "#6b4b35",
          },
          red: {
            50: "#fdf3f3",
            100: "#fce4e4",
            200: "#facece",
            300: "#f5abab",
            400: "#ec7a7a",
            500: "#dc4f4f", // Rojo suave para acentos
            600: "#c83636",
            700: "#a72b2b",
            800: "#8b2727",
            900: "#742626",
          },
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.4s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
