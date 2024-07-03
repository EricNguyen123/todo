/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'btn-default': '#10b981',
        'btn-hover': '#059669',
      },
      backgroundImage: {
        'login': "url('assets/bg.png')",
      },
      width: {
        'btn-login': '23.75rem',
        'content': '96%',
        'menu': '256px',
        'card-todo': '280px',
        'search': '320px',
        'select-md': '180',
      },
      height: {
        'carousel': '160px',
        'card-todo': '190px',
      }
    },
  },
  plugins: [],
}
