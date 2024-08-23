module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brown': '#8B4513', // Marron moyen pour le texte
        'dark-blue': '#002766', // Bleu foncé pour le bouton
        'light-blue': '#66a3ff', // Bleu clair au survol du bouton
      },
      backgroundImage: {
        'mobile': "url('/src/assets/mobile-background.jpg')",
        'desktop': "url('/src/assets/desktop-background.jpg')",
      },
    },
  },
  plugins: [],
};
