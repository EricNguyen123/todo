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
        'actiec-item': 'rgba(209, 250, 229, 0.5)',
        'white': 'rgb(255 255 255)',
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
        'modal-form': '800px',
        'modal-calendar': '1200px'
      },
      height: {
        'carousel': '160px',
        'card-todo': '190px',
      },
      borderRadius: {
        'custom': '8px',
      },
      placeholderColor: {
        'custom-placeholder': '#d9d9d9',
      },
    },
  },
  plugins: [],
}
