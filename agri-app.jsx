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
  { hour: '06h', temp: 24, condition: 'Aube', rainRisk: 12, text: 'Bonne fraîcheur pour le démarrage.' },
  { hour: '09h', temp: 29, condition: 'Ensoleillé', rainRisk: 8, text: 'Heure idéale pour surveiller les jeunes plants.' },
  { hour: '12h', temp: 33, condition: 'Très chaud', rainRisk: 5, text: 'Attention au stress hydrique.' },
  { hour: '15h', temp: 35, condition: 'Chaleur', rainRisk: 10, text: 'Gardez le sol humide en début de journée.' },
  { hour: '18h', temp: 30, condition: 'Crépuscule', rainRisk: 18, text: 'Le refroidissement aide à limiter le stress.' },
  { hour: '21h', temp: 27, condition: 'Nuit', rainRisk: 20, text: 'Bonne période pour les cultures sensibles à la chaleur.' },
];

const suggestions = [
  { name: 'Tomate', soil: 'Sableux', season: 'Saison des pluies', cycle: '90 jours', water: 'Élevé', tip: 'Semer en poquets avec paillage et mulching.', image: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=900&q=80' },
  { name: 'Niébé', soil: 'Limon', season: 'Début de saison', cycle: '75 jours', water: 'Modéré', tip: 'Choisir des variétés précoces en zones sèches.', image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80' },
  { name: 'Maïs', soil: 'Limon', season: 'Saison humide', cycle: '110 jours', water: 'Modéré', tip: 'Semer après la première vraie pluie.', image: 'https://images.unsplash.com/photo-1532635245-5132528c87a7?auto=format&fit=crop&w=900&q=80' },
  { name: 'Carotte', soil: 'Sableux', season: 'Fin de saison sèche', cycle: '120 jours', water: 'Modéré', tip: 'Préparer des sillons bien drainés et un sol léger.', image: 'https://images.unsplash.com/photo-1447175008436-054170c2e979?auto=format&fit=crop&w=900&q=80' },
  { name: 'Aubergine', soil: 'Limon', season: 'Saison chaude', cycle: '100 jours', water: 'Élevé', tip: 'Maintenir le sol humide sans saturation.', image: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=900&q=80' },
  { name: 'Piment', soil: 'Sableux', season: 'Saison humide', cycle: '90 jours', water: 'Modéré', tip: 'Ajouter du compost pour stabiliser la croissance.', image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=900&q=80' },
  { name: 'Gombo', soil: 'Argileux', season: 'Saison chaude', cycle: '60 jours', water: 'Modéré', tip: 'Semer en poquets avec un paillage léger.', image: 'https://images.unsplash.com/photo-1557844352-761f2565b576?auto=format&fit=crop&w=900&q=80' },
  { name: 'Patate douce', soil: 'Limon', season: 'Début des pluies', cycle: '120 jours', water: 'Modéré', tip: 'Choisir un sol meuble et bien drainé.', image: 'https://images.unsplash.com/photo-1604908553414-7d3f28d9782d?auto=format&fit=crop&w=900&q=80' },
];

const soils = [
  { name: 'Sableux', label: 'Dior', description: 'Très drainé, chaud et léger.', advantage: 'Travail facile et réchauffe vite.', limit: 'Retient peu l’eau et les nutriments.', improvement: 'Ajouter compost et matière organique.', crops: ['Tomate', 'Arachide', 'Oignon'] },
  { name: 'Argileux', label: 'Deck', description: 'Dense et fertile, bonne rétention.', advantage: 'Bon stock en eau et nutrition.', limit: 'Peut se compacter et s’assécher en croûte.', improvement: 'Aérer, pailler et éviter le travail excessif.', crops: ['Maïs', 'Riz', 'Chou'] },
  { name: 'Limon', label: 'Deck', description: 'Très équilibré pour la culture.', advantage: 'Bonne fertilité et structure.', limit: 'Peut se coller après pluie forte.', improvement: 'Maintenir le couvert végétal et la matière organique.', crops: ['Niébé', 'Patate douce', 'Carotte'] },
  { name: 'Latéritique', label: 'Tanne', description: 'Typique des zones tropicales à forte oxydation.', advantage: 'Bonne profondeur et bonne stabilité.', limit: 'Forte acidité et faible réserve minérale.', improvement: 'Apporter du compost et corriger le pH.', crops: ['Mil', 'Sorgho', 'Manguier'] },
  { name: 'Salin', label: 'Tanne', description: 'Risque de concentration en sel.', advantage: 'Peut être valorisé après lessivage.', limit: 'Nuisible à la germination et à l’eau disponible.', improvement: 'Laver le sol et éviter l’irrigation par ruissellement.', crops: ['Arachide', 'Pastèque', 'Moringa'] },
];

const crops = [
  { name: 'Mil', type: 'Ancienne', soil: 'Latéritique', cycle: '90 jours', water: 'Faible', image: 'https://images.unsplash.com/photo-1464226184884-fa52ac9fcf6b?auto=format&fit=crop&w=900&q=80', note: 'Très adaptée au climat sec et aux sols bien drainés.' },
  { name: 'Sorgho', type: 'Ancienne', soil: 'Latéritique', cycle: '100 jours', water: 'Faible', image: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=900&q=80', note: 'Résiste bien à la sécheresse et aux faibles pluies.' },
  { name: 'Maïs', type: 'Ancienne', soil: 'Argileux', cycle: '110 jours', water: 'Modéré', image: 'https://images.unsplash.com/photo-1532635245-5132528c87a7?auto=format&fit=crop&w=900&q=80', note: 'Exige un sol fertile et un bon démarrage.' },
  { name: 'Riz', type: 'Nouvelle', soil: 'Argileux', cycle: '120 jours', water: 'Élevé', image: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=900&q=80', note: 'Mieux sur sol lourd humide, prêt à l’irrigation.' },
  { name: 'Fonio', type: 'Ancienne', soil: 'Sableux', cycle: '70 jours', water: 'Faible', image: 'https://images.unsplash.com/photo-1464226184884-fa52ac9fcf6b?auto=format&fit=crop&w=900&q=80', note: 'Très résistant et précieux en climat sec.' },
  { name: 'Arachide', type: 'Ancienne', soil: 'Sableux', cycle: '110 jours', water: 'Modéré', image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80', note: 'Très utilisée pour la rotation et la diversification.' },
  { name: 'Niébé', type: 'Ancienne', soil: 'Limon', cycle: '75 jours', water: 'Modéré', image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80', note: 'Bonne fixation azotée et excellente valeur de culture de sécurité.' },
  { name: 'Haricot vert', type: 'Nouvelle', soil: 'Limon', cycle: '55 jours', water: 'Modéré', image: 'https://images.unsplash.com/photo-1522184216316-3c25f4d0f57d?auto=format&fit=crop&w=900&q=80', note: 'Très adapté aux petits jardins et cultures intensives.' },
  { name: 'Sésame', type: 'Ancienne', soil: 'Sableux', cycle: '90 jours', water: 'Faible', image: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=900&q=80', note: 'Céréale à huile qui se cultive bien en zone sèche.' },
  { name: 'Oignon', type: 'Ancienne', soil: 'Sableux', cycle: '120 jours', water: 'Modéré', image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=900&q=80', note: 'Parfaite en saisons plus fraîches.' },
  { name: 'Carotte', type: 'Ancienne', soil: 'Limon', cycle: '80 jours', water: 'Modéré', image: 'https://images.unsplash.com/photo-1447175008436-054170c2e979?auto=format&fit=crop&w=900&q=80', note: 'Sol fin, friable et bien ameubli.' },
  { name: 'Pomme de terre', type: 'Nouvelle', soil: 'Limon', cycle: '90 jours', water: 'Élevé', image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=900&q=80', note: 'Mieux en altitude ou en zones fraîches.' },
  { name: 'Manioc', type: 'Ancienne', soil: 'Sableux', cycle: '300 jours', water: 'Faible', image: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=900&q=80', note: 'Très résistant à la sécheresse et fiable.' },
  { name: 'Igname', type: 'Ancienne', soil: 'Limon', cycle: '240 jours', water: 'Modéré', image: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=900&q=80', note: 'Adaptée aux sols bien drainés et au climat chaud.' },
  { name: 'Patate douce', type: 'Ancienne', soil: 'Limon', cycle: '120 jours', water: 'Modéré', image: 'https://images.unsplash.com/photo-1604908553414-7d3f28d9782d?auto=format&fit=crop&w=900&q=80', note: 'Très bien adaptée aux climats tropicaux.' },
  { name: 'Tomate', type: 'Nouvelle', soil: 'Sableux', cycle: '90 jours', water: 'Élevé', image: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=900&q=80', note: 'Besoin de paillage et d’une bonne gestion de l’eau.' },
  { name: 'Piment', type: 'Nouvelle', soil: 'Sableux', cycle: '90 jours', water: 'Modéré', image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=900&q=80', note: 'Très rentable sur les marchés locaux et urbains.' },
  { name: 'Aubergine', type: 'Nouvelle', soil: 'Argileux', cycle: '100 jours', water: 'Modéré', image: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=900&q=80', note: 'Bon rendement sous irrigation ponctuelle.' },
  { name: 'Poivron', type: 'Nouvelle', soil: 'Limon', cycle: '80 jours', water: 'Modéré', image: 'https://images.unsplash.com/photo-1592841200221-6fe3b8b64108?auto=format&fit=crop&w=900&q=80', note: 'Couleur et rentabilité pour le maraîchage.' },
  { name: 'Gombo', type: 'Ancienne', soil: 'Argileux', cycle: '60 jours', water: 'Modéré', image: 'https://images.unsplash.com/photo-1557844352-761f2565b576?auto=format&fit=crop&w=900&q=80', note: 'Très bien adaptée à la saison chaude.' },
  { name: 'Pastèque', type: 'Ancienne', soil: 'Sableux', cycle: '80 jours', water: 'Modéré', image: 'https://images.unsplash.com/photo-1589881133595-a3c085cb731d?auto=format&fit=crop&w=900&q=80', note: 'Cueillette rapide et forte demande sur le marché.' },
  { name: 'Chou', type: 'Ancienne', soil: 'Argileux', cycle: '90 jours', water: 'Élevé', image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=900&q=80', note: 'Très sensible au stress hydrique et aux maladies.' },
  { name: 'Laitue', type: 'Nouvelle', soil: 'Limon', cycle: '45 jours', water: 'Élevé', image: 'https://images.unsplash.com/photo-1559622214-0e643e57dc75?auto=format&fit=crop&w=900&q=80', note: 'Privilégier les semis en série pour la mise sur marché.' },
  { name: 'Moringa', type: 'Nouvelle', soil: 'Salin', cycle: '360 jours', water: 'Faible', image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=900&q=80', note: 'Arbre très utile pour la nutrition et la protection du sol.' },
  { name: 'Papayer', type: 'Nouvelle', soil: 'Limon', cycle: '350 jours', water: 'Modéré', image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=900&q=80', note: 'Exige un bon accès à l’eau et un sol sain.' },
  { name: 'Anacardier', type: 'Ancienne', soil: 'Latéritique', cycle: '730 jours', water: 'Faible', image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80', note: 'Culture de rente adaptée au climat tropical.' },
  { name: 'Manguier', type: 'Ancienne', soil: 'Limon', cycle: '720 jours', water: 'Modéré', image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=900&q=80', note: 'Très rentable dans les zones chaudes et ensoleillées.' },
  { name: 'Coton', type: 'Ancienne', soil: 'Sableux', cycle: '180 jours', water: 'Modéré', image: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=900&q=80', note: 'Culture commerciale avec attention au calendrier des semis.' },
  { name: 'Canne à sucre', type: 'Nouvelle', soil: 'Argileux', cycle: '360 jours', water: 'Élevé', image: 'https://images.unsplash.com/photo-1528819622761-6bcf032f31d5?auto=format&fit=crop&w=900&q=80', note: 'Très rentable en zones irrigables et bien fertilisées.' },
];

const news = [
  { title: 'Irrigation goutte à goutte : les paysans gagnent en efficacité', source: 'Ministère de l’Agriculture', tag: 'Irrigation', date: '4 jours' },
  { title: 'Semences tolérantes à la sécheresse en hausse au Sénégal', source: 'Presse nationale', tag: 'Semences', date: '1 semaine' },
  { title: 'Agriculture de conservation : premières retombées sur le terrain', source: 'Organisation régionale', tag: 'Agroécologie', date: '10 jours' },
];

const premiumPlans = [
  { name: 'Essentiel', price: '1 000 FCFA', feat: '20 réponses IA • rotation 3 ans • calendrier d’arrosage', professionalFeature: 'Carnet de suivi des lots et fiche de récolte.', accent: 'primary', payment: 'Wave' },
  { name: 'Pro', price: '5 000 FCFA', feat: '100 réponses IA détaillées • fiches de semis • engrais maison', professionalFeature: 'Trame qualité et calcul des coûts à partir de vos données.', accent: 'gold', payment: 'Wave' },
  { name: 'Expert', price: '15 000 FCFA', feat: '400 réponses IA • plan 1 ha • vente, stockage, transformation', professionalFeature: 'Dossier prévisionnel d’atelier et de débouchés.', accent: 'deep', payment: 'Wave' },
];

const transformationGuides = [
  {
    name: 'Mangue séchée',
    crop: 'Mangue',
    icon: '🥭',
    product: 'Tranches de mangue séchée',
    steps: ['Trier les fruits et écarter ceux qui sont abîmés.', 'Laver à l’eau potable, éplucher et couper régulièrement.', 'Sécher avec un procédé adapté et validé pour les aliments.', 'Laisser refroidir dans un espace propre avant de conditionner.'],
    watch: 'Protéger le produit de l’humidité et des manipulations après séchage.',
  },
  {
    name: 'Farine de mil',
    crop: 'Mil',
    icon: '🌾',
    product: 'Farine pour bouillies et préparations',
    steps: ['Trier les grains et retirer les corps étrangers.', 'Vérifier que le grain est apte au stockage et à la mouture.', 'Moudre avec du matériel propre et adapté aux céréales.', 'Tamiser si nécessaire, puis conditionner dans un emballage propre et sec.'],
    watch: 'Garder le lot identifié et à l’abri de l’humidité.',
  },
  {
    name: 'Fonio précuit',
    crop: 'Fonio',
    icon: '🍚',
    product: 'Fonio prêt à cuire',
    steps: ['Nettoyer et trier le fonio selon la qualité du lot.', 'Décortiquer et laver avec de l’eau potable.', 'Appliquer une cuisson à la vapeur selon un procédé validé.', 'Sécher et conditionner dans des conditions maîtrisées.'],
    watch: 'Protéger le fonio après cuisson contre les contaminations et l’humidité.',
  },
  {
    name: 'Pâte d’arachide',
    crop: 'Arachide',
    icon: '🥜',
    product: 'Pâte à base d’arachide',
    steps: ['Sélectionner un lot propre et écarter les graines altérées.', 'Nettoyer et préparer les graines selon une méthode maîtrisée.', 'Torréfier puis broyer avec des équipements propres et adaptés.', 'Conditionner en séparant les lots et en indiquant leur date de fabrication.'],
    watch: 'L’arachide peut présenter des risques de mycotoxines et d’allergie. Le tri visuel ne garantit pas l’absence de contaminants.',
  },
  {
    name: 'Poudre de moringa',
    crop: 'Moringa',
    icon: '🌿',
    product: 'Feuilles de moringa en poudre',
    steps: ['Écarter les feuilles abîmées et retirer les impuretés.', 'Laver avec de l’eau potable et égoutter dans un espace propre.', 'Sécher à l’abri de la poussière avec un procédé alimentaire adapté.', 'Broyer et conditionner dans un emballage propre, sec et fermé.'],
    watch: 'Prévenir l’humidité et la recontamination pendant le séchage et le conditionnement.',
  },
  {
    name: 'Pulpe de tomate',
    crop: 'Tomate',
    icon: '🍅',
    product: 'Base de tomate fraîche',
    steps: ['Trier les tomates fraîches et éliminer les fruits altérés.', 'Laver à l’eau potable et retirer les parties abîmées.', 'Broyer et préparer en petites séries dans du matériel propre.', 'Pour toute conservation, appliquer un procédé validé adapté au produit.'],
    watch: 'Cette préparation fraîche n’est pas une conserve. Ne pas la garder à température ambiante sans procédé validé.',
  },
];

const professionalExclusives = [
  {
    plan: 'Essentiel',
    format: 'Fiche terrain',
    name: 'Carnet de lot et de récolte',
    summary: 'Suivez l’origine de la récolte, les opérations réalisées, les dates, les pertes observées et le stockage.',
  },
  {
    plan: 'Pro',
    format: 'Outil de travail',
    name: 'Qualité et coût de transformation',
    summary: 'Trame de contrôle par lot et calcul des coûts à compléter avec vos prix, mesures et rendements observés.',
  },
  {
    plan: 'Expert',
    format: 'Dossier technique',
    name: 'Atelier, traçabilité et débouchés',
    summary: 'Préparez une étude d’atelier, les besoins en équipements et un plan de commercialisation à vérifier localement.',
  },
];

function App() {
  const [activeTab, setActiveTab] = useState('maintenant');
  const [selectedCountry, setSelectedCountry] = useState('Sénégal');
  const [hourIndex, setHourIndex] = useState(2);
  const [soilFilter, setSoilFilter] = useState('Tous');
  const [query, setQuery] = useState('');
  const [authClient, setAuthClient] = useState(null);
  const [authUser, setAuthUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [authAvailable, setAuthAvailable] = useState(false);
  const [authBusy, setAuthBusy] = useState(false);
  const [authMessage, setAuthMessage] = useState('');
  const [authServiceMessage, setAuthServiceMessage] = useState('');
  const [authMode, setAuthMode] = useState('signup');
  const [showSignupLanding, setShowSignupLanding] = useState(true);
  const [installNotice, setInstallNotice] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('Essentiel');
  const [premiumPhone, setPremiumPhone] = useState('707449987');
  const [paymentNotice, setPaymentNotice] = useState('');
  const [newsData, setNewsData] = useState(null);
  const [newsLoading, setNewsLoading] = useState(false);
  const [newsError, setNewsError] = useState('');
  const [newsRefresh, setNewsRefresh] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [photoCredits, setPhotoCredits] = useState([]);

  const filteredCrops = useMemo(() => {
    return crops.filter((crop) => {
      const matchesQuery = crop.name.toLowerCase().includes(query.toLowerCase());
      const matchesSoil = soilFilter === 'Tous' || crop.soil === soilFilter;
      return matchesQuery && matchesSoil;
    });
  }, [query, soilFilter]);

  const handleAuthSubmit = async (event) => {
    event.preventDefault();
    if (!authClient) {
      setAuthMessage('Les comptes ne sont pas encore configurés. Le propriétaire doit terminer le raccordement Supabase avant de pouvoir créer un compte.');
      return;
    }

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get('email') || '').trim();
    const password = String(formData.get('password') || '');
    setAuthBusy(true);
    setAuthMessage('');
    try {
      if (authMode === 'signup') {
        const redirectUrl = new URL(window.location.href);
        redirectUrl.search = '';
        redirectUrl.hash = '';
        const { data, error } = await authClient.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: ['http:', 'https:'].includes(redirectUrl.protocol) ? redirectUrl.toString() : undefined,
            data: {
              full_name: String(formData.get('fullName') || '').trim(),
              country: String(formData.get('country') || selectedCountry),
            },
          },
        });
        if (error) throw error;
        if (data.session) {
          setAuthUser(data.user);
          setSelectedCountry(String(data.user?.user_metadata?.country || selectedCountry));
          setActiveTab('compte');
        } else {
          setAuthMessage('Compte créé. Consultez votre boîte e-mail pour confirmer votre adresse avant de vous connecter.');
          setAuthMode('login');
        }
      } else {
        const { data, error } = await authClient.auth.signInWithPassword({ email, password });
        if (error) throw error;
        setAuthUser(data.user);
        setSelectedCountry(String(data.user?.user_metadata?.country || selectedCountry));
        setActiveTab('compte');
      }
    } catch (error) {
      console.error('Échec de l’authentification AgriGuide.', error);
      setAuthMessage(error.message || 'Impossible de traiter la demande. Réessayez.');
    } finally {
      setAuthBusy(false);
    }
  };

  const handleSignOut = async () => {
    if (!authClient) return;
    setAuthBusy(true);
    setAuthMessage('');
    try {
      const { error } = await authClient.auth.signOut();
      if (error) throw error;
      setAuthUser(null);
      setShowSignupLanding(true);
      setAuthMode('login');
    } catch (error) {
      console.error('Échec de la déconnexion AgriGuide.', error);
      setAuthMessage(error.message || 'Impossible de vous déconnecter. Réessayez.');
    } finally {
      setAuthBusy(false);
    }
  };

  const handleSelectPlan = (planName) => {
    setSelectedPlan(planName);
    setPaymentNotice(`Formule ${planName} sélectionnée. Suivez les instructions Wave ci-dessous.`);
    document.getElementById('premium-payment')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleCopyPaymentNumber = async () => {
    try {
      await navigator.clipboard.writeText(premiumPhone);
      setPaymentNotice(`Numéro Wave ${premiumPhone} copié. Vérifiez le destinataire et le montant avant de confirmer votre transfert.`);
    } catch (error) {
      console.error('Impossible de copier le numéro Wave.', error);
      setPaymentNotice(`La copie est indisponible. Saisissez manuellement le numéro Wave ${premiumPhone}.`);
    }
  };

  const handleInstallApp = async () => {
    const isInstalled = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
    if (isInstalled) {
      setInstallNotice('AgriGuide est déjà installée sur cet appareil.');
      return;
    }

    const installPrompt = window.__agriguideInstallPrompt;
    if (installPrompt) {
      window.__agriguideInstallPrompt = null;
      try {
        await installPrompt.prompt();
        const { outcome } = await installPrompt.userChoice;
        setInstallNotice(outcome === 'accepted'
          ? 'Installation lancée. AgriGuide sera disponible depuis votre écran d’accueil.'
          : 'Installation annulée. Vous pourrez réessayer depuis ce bouton.');
      } catch (error) {
        console.error('Impossible de lancer l’installation de l’app.', error);
        setInstallNotice('L’installation automatique a échoué. Utilisez le menu de votre navigateur pour ajouter AgriGuide à l’écran d’accueil.');
      }
      return;
    }

    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
      || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    if (isIOS) {
      setInstallNotice('Sur iPhone ou iPad : touchez Partager dans Safari, puis « Sur l’écran d’accueil ».');
    } else if (/Android/i.test(navigator.userAgent)) {
      setInstallNotice('Sur Android : ouvrez le menu ⋮ de Chrome, puis choisissez « Installer l’application » ou « Ajouter à l’écran d’accueil ».');
    } else if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
      setInstallNotice('L’installation nécessite une connexion sécurisée. Ouvrez la version officielle d’AgriGuide en HTTPS puis réessayez.');
    } else {
      setInstallNotice('Dans Chrome ou Edge, ouvrez le menu près de la barre d’adresse et choisissez « Installer AgriGuide ».');
    }
  };

  const selectedWeather = weatherByHour[hourIndex];

  useEffect(() => {
    let mounted = true;
    let subscription;
    const config = window.AGRIGUIDE_SUPABASE_CONFIG;

    if (!config?.url || !config?.publishableKey) {
      setAuthServiceMessage('Les comptes réels ne sont pas encore activés. Le propriétaire doit configurer l’URL et la clé publique du projet Supabase.');
      setAuthReady(true);
      return undefined;
    }
    if (!window.supabase?.createClient) {
      setAuthServiceMessage('Le service de comptes est indisponible. Rechargez la page et réessayez.');
      setAuthReady(true);
      return undefined;
    }

    const initializeAuth = async () => {
      try {
        const client = window.supabase.createClient(config.url, config.publishableKey, {
          auth: { persistSession: true, autoRefreshToken: true },
        });
        const { data, error } = await client.auth.getSession();
        if (error) throw error;
        if (!mounted) return;
        setAuthClient(client);
        setAuthAvailable(true);
        setAuthUser(data.session?.user || null);
        if (data.session?.user?.user_metadata?.country) {
          setSelectedCountry(data.session.user.user_metadata.country);
        }
        subscription = client.auth.onAuthStateChange((_event, session) => {
          if (mounted) setAuthUser(session?.user || null);
        }).data.subscription;
      } catch (error) {
        console.error('Impossible d’initialiser les comptes AgriGuide.', error);
        if (mounted) setAuthServiceMessage(`Connexion au service de comptes impossible : ${error.message}`);
      } finally {
        if (mounted) setAuthReady(true);
      }
    };

    initializeAuth();
    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const onBeforeInstallPrompt = (event) => {
      event.preventDefault();
      window.__agriguideInstallPrompt = event;
    };
    const onAppInstalled = () => {
      window.__agriguideInstallPrompt = null;
      setInstallNotice('AgriGuide est installée. Vous pouvez maintenant l’ouvrir depuis votre écran d’accueil.');
    };

    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt);
    window.addEventListener('appinstalled', onAppInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt);
      window.removeEventListener('appinstalled', onAppInstalled);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetch('./crop-photo-credits.json')
      .then((response) => {
        if (!response.ok) throw new Error(`Erreur ${response.status}`);
        return response.json();
      })
      .then((credits) => {
        if (!cancelled) setPhotoCredits(credits);
      })
      .catch((error) => {
        if (!cancelled) console.error('Impossible de charger les crédits photo :', error);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (activeTab !== 'actualites') return undefined;
    let cancelled = false;
    setNewsLoading(true);
    setNewsError('');
    fetch('./news.json', { cache: 'no-store' })
      .then((response) => {
        if (!response.ok) throw new Error(`Erreur ${response.status}`);
        return response.json();
      })
      .then((data) => {
        if (!cancelled) setNewsData(data);
      })
      .catch((error) => {
        if (!cancelled) setNewsError(`Les actualités ne sont pas disponibles : ${error.message}`);
      })
      .finally(() => {
        if (!cancelled) setNewsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [activeTab, newsRefresh]);

  return (
    <div className="agri-shell">
      <aside className="sidebar">
        <div className="brand-wrap">
          <div className="brand-mark">A</div>
          <div>
            <div className="brand-name">{appBrand.name}</div>
            <div className="brand-location">Sénégal • FCFA</div>
          </div>
        </div>

        <label className="country-select-label" htmlFor="country-select">
          Pays de culture
        </label>
        <select id="country-select" className="country-select" value={selectedCountry} onChange={(event) => setSelectedCountry(event.target.value)}>
          {countries.map((country) => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>

        <div className="nav-header">Navigation</div>
        <nav className="nav-list">
          {tabs.map((tab) => (
            <button
              type="button"
              key={tab.id}
              className={`nav-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="nav-icon">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="side-bottom">
          <div className="store-pill">
            <span className="store-dot" />
            Météo nationale • {selectedCountry}
          </div>
          {authUser && (
            <div className="profile-mini">
              <div className="avatar">{(authUser.user_metadata?.full_name || authUser.email || 'AG').slice(0, 2).toUpperCase()}</div>
              <div className="profile-copy">
                {authUser.user_metadata?.full_name || authUser.email}
                <small>Compte connecté</small>
              </div>
            </div>
          )}
        </div>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <div>
            <div className="crumb">AgriGuide / {selectedCountry}</div>
            <div className="page-title">
              {activeTab === 'maintenant' ? 'Accueil' : tabs.find((tab) => tab.id === activeTab)?.label || 'AgriGuide'}
            </div>
          </div>
          <div className="top-actions">
            <div className="search-wrap">
              <span className="search-icon">⌕</span>
              <input type="text" className="search-input" placeholder="Rechercher une culture" value={query} onChange={(event) => setQuery(event.target.value)} />
            </div>
            <div className="short-link-badge">
              {window.location.hostname === 'localhost' ? 'Version de test' : `${window.location.host}${window.location.pathname}`}
            </div>
            <button type="button" className="icon-button">🔔<span className="count-badge">3</span></button>
            <button type="button" className="button button-secondary" onClick={handleInstallApp}>Télécharger l’app</button>
            <button type="button" className="button button-primary" onClick={() => setActiveTab('premium')}>Premium</button>
          </div>
        </header>

        <div className="content-area">
          {installNotice && (
            <div className="install-notice" role="status">
              <span>{installNotice}</span>
              <button type="button" aria-label="Fermer le message d’installation" onClick={() => setInstallNotice('')}>Fermer</button>
            </div>
          )}
          {activeTab === 'maintenant' && (
            <>
              <section className="hero-panel">
                <div className="scene">
                  <div className="sun" />
                  <div className="cloud cloud-one" />
                  <div className="cloud cloud-two" />
                  <div className="cloud cloud-three" />
                  <div className="hill hill-back" />
                  <div className="hill hill-front" />
                  <div className="field-field" />
                </div>
                <div className="hero-copy">
                  <span className="eyebrow">{appBrand.name}</span>
                  <h1>Planter mieux, avec le bon climat et le bon moment.</h1>
                  <p>Conseils agronomiques simples, météo locale, solutions pour vos cultures et votre sol.</p>
                  <div className="hero-actions">
                    <button type="button" className="button button-primary" onClick={() => setActiveTab('cultures')}>Quoi planter maintenant</button>
                    <button type="button" className="button button-secondary" onClick={() => setActiveTab('premium')}>Premium</button>
                    <button type="button" className="button button-secondary" onClick={handleInstallApp}>Télécharger l’app</button>
                    <button type="button" className="button button-secondary" onClick={() => { setShowSignupLanding(true); setAuthMode('signup'); setActiveTab('compte'); }}>Créer un compte</button>
                  </div>
                </div>
                <div className="hero-metrics">
                  <div className="metric-card">
                    <span>Pluie prévue</span>
                    <strong>18%</strong>
                  </div>
                  <div className="metric-card">
                    <span>Saison</span>
                    <strong>Pluies</strong>
                  </div>
                  <div className="metric-card">
                    <span>Semer aujourd’hui</span>
                    <strong>4 cultures</strong>
                  </div>
                </div>
              </section>

              <section className="section-grid two-columns">
                <div className="panel">
                  <div className="panel-head">
                    <h3>Conseil du jour</h3>
                    <span className="tag tag-good">Alerte utile</span>
                  </div>
                  <p>Le sol de votre zone est légèrement sec à la surface. Avant la première vraie pluie, ajoutez du compost et pailler autour des plants de tomate et d’oignon pour limiter le stress hydrique.</p>
                </div>

                <div className="panel">
                  <div className="panel-head">
                    <h3>Calendrier agricole</h3>
                    <span className="tag">Saison actuelle</span>
                  </div>
                  <ul className="mini-list">
                    <li>Mil et sorgho : semer avant la pluie durable.</li>
                    <li>Niébé : effectuer en parcelles bien drainées.</li>
                    <li>Tomate : démarrer sous paillis sur sol sableux.</li>
                  </ul>
                </div>
              </section>

              <section className="section-block">
                <div className="section-header">
                  <h2>À semer maintenant</h2>
                  <button type="button" className="link-button" onClick={() => setActiveTab('cultures')}>Voir tout</button>
                </div>
                <div className="card-grid four-grid">
                  {suggestions.map((crop) => {
                    const photo = photoCredits.find((item) => item.name === crop.name);
                    return (
                      <article key={crop.name} className="crop-card compact">
                        {photo ? <img src={photo.file} alt={crop.name} loading="lazy" /> : <div className="crop-photo-placeholder">Photo à vérifier</div>}
                        <div className="crop-card-body compact-body">
                          <h4>{crop.name}</h4>
                          <div className="meta-row">
                            <span>{crop.soil}</span>
                            <span>{crop.cycle}</span>
                          </div>
                          <p>{crop.tip}</p>
                          {photo && (
                            <a className="photo-credit" href={photo.sourceUrl} target="_blank" rel="noreferrer">
                              Photo : {photo.creator} • {photo.license}
                            </a>
                          )}
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            </>
          )}

          {activeTab === 'assistant' && (
            <section className="panel single-panel">
              <div className="panel-head">
                <h3>Assistant IA</h3>
                <span className="tag">Indicatif</span>
              </div>
              <div className="assistant-box">
                <div className="assistant-bubble user">Je vois des feuilles jaunies sur mes plants de tomate dans le Sénégal.</div>
                <div className="assistant-bubble assistant">Vérifiez d’abord si le problème vient d’un excès d’eau or d’un manque de nutriments. En climat tropical sec, la jaunisse peut venir d’un sol salin ou d’une irrigation irrégulière. Consultez un technicien pour les cas graves.</div>
              </div>
              <div className="assistant-actions">
                <button type="button" className="button button-primary">Poser une question</button>
                <button type="button" className="button button-secondary">5 réponses gratuites</button>
              </div>
            </section>
          )}

          {activeTab === 'sols' && (
            <section className="section-block">
              <div className="section-header">
                <h2>Les sols</h2>
              </div>
              <div className="card-grid three-grid">
                {soils.map((soil) => (
                  <article key={soil.name} className="info-card">
                    <div className="info-card-top">
                      <h3>{soil.name}</h3>
                      <span>{soil.label}</span>
                    </div>
                    <p>{soil.description}</p>
                    <ul>
                      <li><strong>Avantage</strong> : {soil.advantage}</li>
                      <li><strong>Limite</strong> : {soil.limit}</li>
                      <li><strong>Amélioration</strong> : {soil.improvement}</li>
                      <li><strong>Cultures</strong> : {soil.crops.join(', ')}</li>
                    </ul>
                  </article>
                ))}
              </div>
            </section>
          )}

          {activeTab === 'cultures' && (
            <section className="section-block">
              <div className="section-header">
                <h2>Cultures adaptées</h2>
                <div className="filter-group">
                  <select value={soilFilter} onChange={(event) => setSoilFilter(event.target.value)} className="select-input">
                    <option value="Tous">Tous sols</option>
                    {soils.map((soil) => (
                      <option value={soil.name} key={soil.name}>{soil.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="card-grid four-grid">
                {filteredCrops.map((crop) => {
                  const photo = photoCredits.find((item) => item.name === crop.name);
                  return (
                    <article key={crop.name} className="crop-card">
                      {photo ? <img src={photo.file} alt={crop.name} loading="lazy" /> : <div className="crop-photo-placeholder">Photo à vérifier</div>}
                      <div className="crop-card-body">
                        <div className="crop-type-row">
                          <h3>{crop.name}</h3>
                          <span>{crop.type}</span>
                        </div>
                        <div className="meta-row">
                          <span>{crop.soil}</span>
                          <span>{crop.cycle}</span>
                        </div>
                        <p>{crop.note}</p>
                        {photo && (
                          <a className="photo-credit" href={photo.sourceUrl} target="_blank" rel="noreferrer">
                            Photo : {photo.creator} • {photo.license}
                          </a>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          )}

          {activeTab === 'outils' && (
            <section className="panel single-panel">
              <div className="panel-head">
                <h3>Outils pro</h3>
                <span className="tag">Rentabilité</span>
              </div>
              <div className="tool-grid">
                <div className="tool-item">
                  <strong>Rentabilité</strong>
                  <p>Surface • rendement • prix de vente • revenu • marge.</p>
                </div>
                <div className="tool-item">
                  <strong>Semences et engrais</strong>
                  <p>Quantités, doses, sacs de 50 kg, coût total.</p>
                </div>
                <div className="tool-item">
                  <strong>Mon champ</strong>
                  <p>Planning de parcelle, calendrier personnalisé.</p>
                </div>
              </div>
            </section>
          )}

          {activeTab === 'meteo' && (
            <section className="weather-wrap">
              <div className="panel weather-panel">
                <div className="panel-head">
                  <h3>Météo locale</h3>
                  <span className="tag">{selectedCountry}</span>
                </div>
                <div className="weather-hero">
                  <div>
                    <div className="temp-big">{selectedWeather.temp}°C</div>
                    <p>{selectedWeather.condition} • Risque pluie {selectedWeather.rainRisk}%</p>
                  </div>
                  <div className="weather-status">{selectedWeather.text}</div>
                </div>
                <input
                  type="range"
                  min="0"
                  max={weatherByHour.length - 1}
                  value={hourIndex}
                  onChange={(event) => setHourIndex(Number(event.target.value))}
                  className="hour-slider"
                />
                <div className="hour-labels">
                  {weatherByHour.map((item, index) => (
                    <span key={item.hour} className={index === hourIndex ? 'active' : ''}>{item.hour}</span>
                  ))}
                </div>
                <button type="button" className="button button-primary">Lancer la journée</button>
              </div>

              <div className="panel small-panel">
                <div className="panel-head">
                  <h3>Conseil agricole</h3>
                </div>
                <p>La saison actuelle est la saison des pluies. Préparez les sillons, surveillez le drainage et évitez d’arroser en plein soleil.</p>
                <ul className="mini-list">
                  <li>Vent fort : sécuriser les cultures hautes.</li>
                  <li>Pluie faible : pailler autour des plants.</li>
                  <li>Température élevée : commencer les travaux tôt.</li>
                </ul>
              </div>
            </section>
          )}

          {activeTab === 'actualites' && (
            <section className="section-block">
              <div className="news-heading">
                <div>
                  <h2>Actualités agricoles</h2>
                  <p>Informations et vidéos du ministère et de l’Agence de Presse Sénégalaise.</p>
                </div>
                <div className="news-refresh">
                  <span>
                    {newsData?.updatedAt
                      ? `Mis à jour le ${new Date(newsData.updatedAt).toLocaleString('fr-SN', { dateStyle: 'short', timeStyle: 'short', timeZone: 'Africa/Dakar' })}`
                      : 'Chargement des sources officielles'}
                  </span>
                  <button type="button" className="button button-secondary" onClick={() => setNewsRefresh((value) => value + 1)}>Actualiser</button>
                </div>
              </div>
              {newsLoading && <p className="news-status" role="status">Chargement des dernières informations…</p>}
              {newsError && (
                <div className="news-error" role="alert">
                  <p>{newsError}</p>
                  <p>Consultez directement les flux du <a href="https://agriculture.gouv.sn/" target="_blank" rel="noreferrer">ministère</a> ou de l’<a href="https://aps.sn/?s=agriculture" target="_blank" rel="noreferrer">APS</a>.</p>
                </div>
              )}
              {newsData && (
                <>
                  <div className="section-header">
                    <h3>À la une</h3>
                    <span className="tag">Sources sénégalaises</span>
                  </div>
                  {newsData.articles.length > 0 ? (
                    <div className="card-grid three-grid">
                      {newsData.articles.map((item) => {
                        return (
                          <article key={item.url} className="news-card">
                            {item.image ? (
                              <a className="news-image-link" href={item.url} target="_blank" rel="noreferrer">
                                <img src={item.image} alt={`Photo associée à l'article : ${item.title}`} loading="lazy" />
                                <span>Photo de la source</span>
                              </a>
                            ) : <div className="news-image-placeholder">Photo non fournie par la source</div>}
                            <span className="tag">{item.category}</span>
                            <h3>{item.title}</h3>
                            <p>{item.excerpt}</p>
                            <div className="news-foot">
                              <span>{item.source} • {item.publishedAt ? new Date(item.publishedAt).toLocaleDateString('fr-SN', { dateStyle: 'medium', timeZone: 'Africa/Dakar' }) : 'Date non précisée'}</span>
                              <a className="link-button" href={item.url} target="_blank" rel="noreferrer">Lire à la source ↗</a>
                            </div>
                          </article>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="news-status">Aucun article agricole récent n’a été trouvé dans ces flux.</p>
                  )}

                  <div className="section-header news-video-heading">
                    <h3>Vidéos récentes du ministère</h3>
                    <a className="link-button" href="https://www.youtube.com/channel/UCr_Hc46ImdSWH7u6kAy0-iQ" target="_blank" rel="noreferrer">Toutes les vidéos ↗</a>
                  </div>
                  {newsData.videos.length > 0 ? (
                    <div className="card-grid three-grid">
                      {newsData.videos.map((video) => (
                        <article className="news-card video-card" key={video.url}>
                          {selectedVideo?.url === video.url ? (
                            <div className="video-player">
                              <iframe
                                src={video.embedUrl}
                                title={video.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                              />
                            </div>
                          ) : (
                            <button type="button" className="video-poster" onClick={() => setSelectedVideo(video)} aria-label={`Lire la vidéo : ${video.title}`}>
                              <img src={video.image} alt="" loading="lazy" />
                              <span className="play-icon" aria-hidden="true">▶</span>
                              <span className="video-poster-label">Lire la vidéo</span>
                            </button>
                          )}
                          <h3>{video.title}</h3>
                          <p>{video.channel} • {video.publishedAt ? new Date(video.publishedAt).toLocaleDateString('fr-SN', { dateStyle: 'medium', timeZone: 'Africa/Dakar' }) : 'Date non précisée'}</p>
                          {selectedVideo?.url === video.url && <button type="button" className="link-button" onClick={() => setSelectedVideo(null)}>Fermer la vidéo</button>}
                        </article>
                      ))}
                    </div>
                  ) : (
                    <p className="news-status">Aucune vidéo agricole récente n’est disponible dans le flux officiel.</p>
                  )}
                </>
              )}
            </section>
          )}

          {activeTab === 'transformation' && (
            <section className="section-block transformation-block">
              <div className="section-header">
                <div>
                  <h2>Transformer les récoltes locales</h2>
                  <p>Des pistes de valorisation pour les produits du Sénégal et de la région.</p>
                </div>
                <span className="tag">Conseils indicatifs</span>
              </div>

              <div className="transformation-safety" role="note">
                <strong>Avant de produire ou de vendre</strong>
                <p>Les étapes ci-dessous sont des repères généraux, pas des procédés de conservation validés. L’hygiène, les conditions de transformation et la durée de conservation doivent être vérifiées avec un technicien agroalimentaire et les services compétents.</p>
              </div>

              <div className="card-grid three-grid transformation-grid">
                {transformationGuides.map((guide) => (
                  <article className="transformation-card" key={guide.name}>
                    <div className="transformation-card-top">
                      <span className="transformation-icon" aria-hidden="true">{guide.icon}</span>
                      <span className="tag">{guide.crop}</span>
                    </div>
                    <h3>{guide.name}</h3>
                    <p><strong>Produit :</strong> {guide.product}</p>
                    <ol className="transformation-steps">
                      {guide.steps.map((step) => <li key={step}>{step}</li>)}
                    </ol>
                    <p className="transformation-watch"><strong>À surveiller :</strong> {guide.watch}</p>
                  </article>
                ))}
              </div>

              <section className="professional-exclusive-block">
                <div className="section-header">
                  <div>
                    <h3>Outils exclusifs pour agronomes</h3>
                    <p>Des supports professionnels à compléter avec les données de chaque exploitation.</p>
                  </div>
                  <span className="tag">Réservé aux membres</span>
                </div>
                <div className="card-grid three-grid">
                  {professionalExclusives.map((exclusive) => (
                    <article className="professional-card" key={exclusive.plan}>
                      <div className="professional-card-top">
                        <span className="tag">{exclusive.plan}</span>
                        <span className="professional-format">{exclusive.format}</span>
                      </div>
                      <h3>{exclusive.name}</h3>
                      <p>{exclusive.summary}</p>
                      <div className="exclusive-preview" aria-hidden="true">
                        <span className="exclusive-preview-line" />
                        <span className="exclusive-preview-line" />
                        <span className="exclusive-preview-line short" />
                      </div>
                      <div className="exclusive-locked">
                        <span aria-hidden="true">🔒</span>
                        <span>Guide complet réservé aux membres {exclusive.plan}</span>
                      </div>
                      <button
                        type="button"
                        className="button button-secondary"
                        onClick={() => { setSelectedPlan(exclusive.plan); setActiveTab('premium'); }}
                      >
                        Voir la formule {exclusive.plan}
                      </button>
                    </article>
                  ))}
                </div>
              </section>
            </section>
          )}

          {activeTab === 'premium' && (
            <section className="section-block premium-block">
              <div className="section-header">
                <h2>Premium</h2>
              </div>
              <section className="professional-exclusive-block premium-exclusive-block">
                <div className="section-header">
                  <div>
                    <h3>Exclusivités pour agronomes</h3>
                    <p>Des fiches de terrain aux dossiers de projet, selon votre formule.</p>
                  </div>
                  <button type="button" className="link-button" onClick={() => setActiveTab('transformation')}>Découvrir la transformation</button>
                </div>
                <div className="card-grid three-grid">
                  {professionalExclusives.map((exclusive) => (
                    <article className="professional-card" key={exclusive.plan}>
                      <div className="professional-card-top">
                        <span className="tag">{exclusive.plan}</span>
                        <span className="professional-format">{exclusive.format}</span>
                      </div>
                      <h3>{exclusive.name}</h3>
                      <p>{exclusive.summary}</p>
                      <div className="exclusive-preview" aria-hidden="true">
                        <span className="exclusive-preview-line" />
                        <span className="exclusive-preview-line" />
                        <span className="exclusive-preview-line short" />
                      </div>
                      <span className="exclusive-locked">
                        <span aria-hidden="true">🔒</span>
                        Contenu réservé aux membres {exclusive.plan}
                      </span>
                      <button type="button" className="link-button" onClick={() => handleSelectPlan(exclusive.plan)}>
                        Débloquer avec {exclusive.plan}
                      </button>
                    </article>
                  ))}
                </div>
                <p className="premium-prototype-note">Aperçus de la démo : l’abonnement et le contrôle d’accès doivent être activés côté serveur avant toute vente de ces contenus.</p>
              </section>
              <div className="card-grid three-grid plans-grid">
                {premiumPlans.map((plan) => (
                  <article key={plan.name} className={`plan-card ${plan.accent} ${selectedPlan === plan.name ? 'selected-plan' : ''}`}>
                    <span className="plan-name">{plan.name}</span>
                    <div className="plan-price">{plan.price}</div>
                    <p>{plan.feat}</p>
                    <p className="plan-pro-exclusive"><strong>Pour les agronomes :</strong> {plan.professionalFeature}</p>
                    <div className="plan-payment">Paiement : {plan.payment}</div>
                    <button type="button" className="button button-primary" onClick={() => handleSelectPlan(plan.name)}>Choisir cette formule</button>
                  </article>
                ))}
              </div>

              <div className="payment-box" id="premium-payment">
                <div className="payment-title">Paiement manuel par Wave</div>
                <div className="payment-legend">
                  Formule choisie : <strong>{selectedPlan}</strong> · Montant : <strong>{premiumPlans.find((plan) => plan.name === selectedPlan)?.price || '1 000 FCFA'}</strong>
                </div>
                <p className="payment-instructions">Ouvrez Wave, saisissez le numéro ci-dessous, puis vérifiez le destinataire et le montant avant de confirmer le transfert. Ne partagez jamais votre code secret.</p>
                <div className="payment-number">
                  Numéro Wave : <strong>{premiumPhone}</strong>
                  <button type="button" className="button button-secondary" onClick={handleCopyPaymentNumber}>Copier le numéro</button>
                </div>
                {paymentNotice && <p className="payment-notice" role="status">{paymentNotice}</p>}
                <p className="payment-disclaimer">Démo : Wave n’est pas connecté à l’application. Le transfert n’est ni vérifié ni confirmé automatiquement et ne débloque pas Premium. Attends la vérification du paiement par le propriétaire de l’application.</p>
              </div>
            </section>
          )}

          {activeTab === 'compte' && (
            !authUser ? (
              showSignupLanding ? (
                <section className="auth-wrapper">
                  <div className="panel auth-panel signup-landing-panel">
                    <div className="landing-header">
                      <span className="eyebrow">Bienvenue</span>
                      <h3>{appBrand.name}</h3>
                      <p>{appBrand.slogan}</p>
                    </div>
                    <div className="signup-benefits">
                      <div className="benefit-item">
                        <strong>📍</strong>
                        <span>Choix du pays et climat local</span>
                      </div>
                      <div className="benefit-item">
                        <strong>🌾</strong>
                        <span>Calendrier agricole et cultures adaptées</span>
                      </div>
                      <div className="benefit-item">
                        <strong>💬</strong>
                        <span>Conseils IA utiles et simples</span>
                      </div>
                    </div>
                    <div className="landing-actions">
                      <button type="button" className="button button-primary full-width" onClick={() => { setShowSignupLanding(false); setAuthMode('signup'); }}>Créer mon compte</button>
                      <button type="button" className="button button-secondary full-width" onClick={() => { setShowSignupLanding(false); setAuthMode('login'); }}>J’ai déjà un compte</button>
                    </div>
                  </div>
                </section>
              ) : (
                <section className="auth-wrapper">
                  <div className="panel auth-panel">
                    <div className="panel-head">
                      <h3>{authMode === 'signup' ? 'Créer un compte' : 'Connexion'}</h3>
                      <span className="tag">{authAvailable ? 'Compte Supabase' : 'Configuration en attente'}</span>
                    </div>
                    <div className="auth-tabs">
                      <button type="button" className={authMode === 'signup' ? 'active' : ''} onClick={() => { setAuthMode('signup'); setAuthMessage(''); }}>Inscription</button>
                      <button type="button" className={authMode === 'login' ? 'active' : ''} onClick={() => { setAuthMode('login'); setAuthMessage(''); }}>Connexion</button>
                    </div>

                    <form className="auth-form" onSubmit={handleAuthSubmit}>
                      {authMode === 'signup' && (
                        <label>
                          Nom complet
                          <input type="text" name="fullName" autoComplete="name" required />
                        </label>
                      )}
                      <label>
                        Adresse e-mail
                        <input type="email" name="email" autoComplete="email" required />
                      </label>
                      <label>
                        Mot de passe
                        <input type="password" name="password" autoComplete={authMode === 'signup' ? 'new-password' : 'current-password'} minLength="8" required />
                      </label>
                      <label>
                        Pays où vous cultivez
                        <select name="country" defaultValue={selectedCountry}>
                          {countries.map((country) => (
                            <option key={country} value={country}>{country}</option>
                          ))}
                        </select>
                      </label>
                      {!authReady && <p role="status">Connexion au service de comptes…</p>}
                      {authServiceMessage && <p className="auth-message" role="status">{authServiceMessage}</p>}
                      {authMessage && <p className="auth-message" role="status">{authMessage}</p>}
                      <button type="submit" className="button button-primary full-width" disabled={!authReady || !authAvailable || authBusy}>
                        {authBusy ? 'Veuillez patienter…' : authMode === 'signup' ? 'Créer mon compte' : 'Se connecter'}
                      </button>
                    </form>
                  </div>
                </section>
              )
            ) : (
              <section className="account-grid">
                <div className="panel">
                  <div className="panel-head">
                    <h3>Mon compte</h3>
                    <span className="tag">Profil</span>
                  </div>
                  <div className="profile-block">
                    <div className="avatar big-avatar">{(authUser.user_metadata?.full_name || authUser.email || 'AG').slice(0, 2).toUpperCase()}</div>
                    <div>
                      <h4>{authUser.user_metadata?.full_name || authUser.email}</h4>
                      <p>{authUser.email} • pays : {authUser.user_metadata?.country || selectedCountry}</p>
                    </div>
                  </div>
                  <div className="stats-grid">
                    {[
                      { label: 'Pays', value: authUser.user_metadata?.country || selectedCountry },
                      { label: 'Statut', value: 'Compte actif' },
                      { label: 'Pluie prévue', value: '18%' },
                      { label: 'Saison', value: 'Saison des pluies' },
                    ].map((stat) => (
                      <div key={stat.label} className="stat-box">
                        <span>{stat.label}</span>
                        <strong>{stat.value}</strong>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="panel">
                  <div className="panel-head">
                    <h3>Paramètres</h3>
                  </div>
                  <ul className="mini-list">
                    <li>Changer de pays</li>
                    <li>Mot de passe oublié</li>
                    <li>Vérification SMS / e-mail</li>
                    <li>Suppression du compte</li>
                  </ul>
                  {authMessage && <p className="auth-message" role="status">{authMessage}</p>}
                  <button type="button" className="button button-secondary" onClick={handleSignOut} disabled={authBusy}>
                    {authBusy ? 'Veuillez patienter…' : 'Se déconnecter'}
                  </button>
                </div>
              </section>
            )
          )}
        </div>
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
