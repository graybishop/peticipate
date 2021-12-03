module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        test: '#293847',
        'orange-primary': '#FF6F00',
        'orange-hover': '#EA580C',
        'blue-secondary': '#8FD3FF',
        'blue-header' : '#D9F0FF',
        'blue-nav-button':'#009BFF',
        'body-background-blue': '#F1F9FF'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
