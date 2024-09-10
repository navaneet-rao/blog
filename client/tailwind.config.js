/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        
        background: {
          1: "rgba(var(--color-bg1))",
          2: "rgba(var(--color-bg2))",
          card: "rgba(var(--color-bg-card))",
          nav: "rgba(var(--color-bg-nav))",
          field: "rgba(var(--color-bg-field))",
        },
        text: {
          1: "rgba(var(--color-text-1))",
          inv: {
            1: "rgba(var(--color-text-inv-1))",
          },
        },
        primary: "rgba(var(--color-primary-1))",
      },
    },
  },
  plugins: [],
};
