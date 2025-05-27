/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#103713",       
        secondary: "#628B35",     
        background: "#FFFDF5",    
        card: "#E2DBD0",          
        error: "#FF4D4F",         
        success: "#52C41A",      
        info: "#1890FF",          
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      spacing: {
        'nav': '4.5rem', 
      },
      screens: {
        'xs': '400px',  
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [typography],
};
