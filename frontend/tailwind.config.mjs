/** @type {import('tailwindcss').Config} */
export default {
    content: [
      './src/**/*.{js,ts,jsx,tsx}',
      './public/**/*.html',
    ],
    theme: {
      extend: {
        colors: {
          primary: '#FFD700',
          dark: '#0D0D0D',
          'africa-green': '#008753',
          'africa-green-dark': '#006642',
          'africa-gold': '#FFD700',
          'africa-gold-dark': '#CCB000',
          'africa-night': '#002233',
          'africa-sunset-start': '#FFAF1B',
          'africa-sunset-end': '#FF6B6B',
        },
        backgroundImage: {
          'afro-grid': "url('/afro-grid.svg')",
        },
        fontFamily: {
          afro: ['Poppins', 'sans-serif'],
        },
        boxShadow: {
          'africa': '0 10px 30px -10px rgba(0, 55, 83, 0.25)',
        },
      },
    },
    plugins: [],
  }
  