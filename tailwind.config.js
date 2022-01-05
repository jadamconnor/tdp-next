module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
          'sans': ['Source Sans Pro'],
          'serif': ['Domine']
      },
      container: {
          center: true,
      },
      colors: {
        'justice-blue': '#6BB8C3',
        'justice-blue-100': '#EFF7F8',
        'justice-gray': '#585048',
        'justice-brown': '#201915',
        'justice-stone': '#5A5047'
      },
    },
  },
  plugins: [],
}