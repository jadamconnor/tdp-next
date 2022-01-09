const { faBorderNone } = require('@fortawesome/pro-solid-svg-icons');

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
          'sans': ['Source Sans Pro'],
          'serif': ['Domine']
      },
      transitionProperty: {
        'height': 'height'
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
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
  ],
}