module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        test: '#293847',
        'orange-primary': '#FF6F00',
        'orange-hover': '#EA580C',
        'orange-light': '#FFB780',
        'blue-secondary': '#8FD3FF',
        'blue-header' : '#D9F0FF',
        'blue-nav-button':'#009BFF',
        'blue-hover' :'#0073BF',
        'body-background-blue': '#F1F9FF'
      },
      height:{
        xl: '36rem',
        '2xl': '48rem',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ],
}
