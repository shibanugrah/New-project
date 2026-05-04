/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#b91f2b",
          dark: "#151515",
          ink: "#252525",
          soft: "#f5f1e9",
          gold: "#d9b66f",
          green: "#154734",
        },
      },
      fontFamily: {
        display: ["Poppins", "Inter", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 18px 45px rgba(20, 20, 20, 0.10)",
      },
    },
  },
  plugins: [],
};
