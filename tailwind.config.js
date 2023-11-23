/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  mode:'jit',
  theme: {
    extend: {
      borderWidth: {
        '2': '2px', // You can customize the border width as needed
      },
    },
  },
  plugins: [],
}
