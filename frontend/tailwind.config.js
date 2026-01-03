/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        odoo: {
          primary: '#714B67',
          'primary-light': '#8F6B85',
          'primary-dark': '#5C3A52',
        },
        success: '#28A745',
        warning: '#FFC107',
        danger: '#DC3545',
        info: '#17A2B8',
        background: '#F9F9F9',
        surface: '#FFFFFF',
        border: '#DEE2E6',
      },
    },
  },
  plugins: [],
};
