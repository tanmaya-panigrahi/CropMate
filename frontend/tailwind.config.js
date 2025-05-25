/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primaryDark: "#103713",
        primaryMid: "#628B35",
        lightBg: "#E2DBD0",
        lightest: "#FFFDF5",
        error: "#FF4D4F",
        success: "#52C41A",
        info: "#1890FF"
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}
