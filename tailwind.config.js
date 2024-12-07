/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
       customPurple:'#8a3a78',customOrange:'#cc832a', customPink:'#8a327c', 
    },
      brightness: {
        25: '0.25',
      },
      fontFamily: {
        'sans': ['Arial', 'sans-serif'],
      },
    },
},
  plugins: [],
};
