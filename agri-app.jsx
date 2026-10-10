const { useEffect, useMemo, useState } = React;


const tabs = [
  { id: 'maintenant', label: 'Maintenant', icon: '☀️' },
  { id: 'assistant', label: 'Assistant IA', icon: '🤖' },
  { id: 'sols', label: 'Sols', icon: '🌱' },
  { id: 'cultures', label: 'Cultures', icon: '🌾' },
  { id: 'transformation', label: 'Transformation', icon: '🥭' },
  { id: 'outils', label: 'Outils pro', icon: '🧰' },
  { id: 'meteo', label: 'Météo', icon: '⛅' },
  { id: 'actualites', label: 'Actualités', icon: '📰' },
  { id: 'premium', label: 'Premium', icon: '⭐' },
  { id: 'compte', label: 'Compte', icon: '👤' },
];


const countries = [
  'Sénégal', 'Mali', 'Burkina Faso', 'Niger', 'Mauritanie', 'Gambie', 'Tchad',
  'Côte d’Ivoire', 'Ghana', 'Togo', 'Bénin', 'Nigeria', 'Guinée', 'Guinée-Bissau',
  'Sierra Leone', 'Liberia', 'Cameroun', 'Gabon', 'Congo', 'RD Congo',
  'Maroc', 'Algérie', 'Tunisie', 'France', 'Belgique', 'Suisse', 'Canada', 'Autre pays'
];


const appBrand = {
  name: 'AgriGuide',
  slogan: 'Cultivez mieux, chaque semaine.'
};


const countryProfiles = {
  Sénégal: { climate: 'Tropical sec', season: 'Saison des pluies', description: 'Le climat est chaud avec de fortes variations de pluviométrie selon les régions.', rainfall: '250 à 700 mm', advice: 'Prioriser les cultures tolérantes à la sécheresse et le paillage.' },
  Mali: { climate: 'Tropical sec', season: 'Saison des pluies', description: 'Les zones soudaniennes demandent un calendrier serré entre semis et précipitations.', rainfall: '350 à 800 mm', advice: 'Gérer les réserves d’eau et les semis précoces.' },
  'Burkina Faso': { climate: 'Tropical sec', season: 'Saison des pluies', description: 'La pluviométrie est courte mais utile pour les céréales et les légumineuses.', rainfall: '400 à 900 mm', advice: 'Adopter des variétés courtes et des paillages protecteurs.' },
  'Côte d’Ivoire': { climate: 'Tropical humide', season: 'Saison des pluies', description: 'Le climat est plus humide, avec une forte pression sur le drainage et la protection des sols.', rainfall: '1200 à 2000 mm', advice: 'Surveiller le drainage et la gestion des maladies foliaires.' },
  Ghana: { climate: 'Tropical humide', season: 'Saison des pluies', description: 'Le climat est favorable aux cultures maraîchères et aux cultures de rente.', rainfall: '800 à 1500 mm', advice: 'Favoriser le paillage et les travaux tôt le matin.' },
};


const weatherByHour = [
