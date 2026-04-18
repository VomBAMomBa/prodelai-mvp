/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      colors: {
        sidebar: '#1e1b2e',
        'page-bg': '#f8f7ff'
      }
    }
  },
  plugins: []
}
