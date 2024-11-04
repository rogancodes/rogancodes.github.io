/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./_site/**/*.html", // Jekyll output files
    "./_includes/**/*.html",
    "./_layouts/**/*.html",
    "./*.md",
    "./**/.html"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
