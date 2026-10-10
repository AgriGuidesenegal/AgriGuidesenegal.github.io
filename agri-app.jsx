const { useEffect, useMemo, useState } = React;

const tabs = [
  { id: 'maintenant', label: 'Maintenant', icon: '☀️' },
  { id: 'assistant', label: 'Assistant IA', icon: '🤖' },
  { id: 'sols', label: 'Sols', icon: '🌱' },
  { id: 'cultures', label: 'Cultures', icon: '🌾' },
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
  name: 'AgriGuide Sénégal',
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
  { name: 'Essentiel', price: '1 000 FCFA', feat: '20 réponses IA • rotation 3 ans • calendrier d’arrosage', accent: 'primary', payment: 'Orange Money / Wave' },
  { name: 'Pro', price: '5 000 FCFA', feat: '100 réponses IA détaillées • fiches de semis • engrais maison', accent: 'gold', payment: 'Orange Money / Wave' },
  { name: 'Expert', price: '15 000 FCFA', feat: '400 réponses IA • plan 1 ha • vente, stockage, transformation', accent: 'deep', payment: 'Orange Money / Wave' },
];

const accountStats = [
  { label: 'Pays', value: 'Sénégal' },
  { label: 'Statut', value: 'Membre Essentiel' },
  { label: 'Pluie prévue', value: '18%' },
  { label: 'Saison', value: 'Saison des pluies' },
];

function App() {
  const [activeTab, setActiveTab] = useState('maintenant');
  const [selectedCountry, setSelectedCountry] = useState('Sénégal');
  const [hourIndex, setHourIndex] = useState(2);
  const [soilFilter, setSoilFilter] = useState('Tous');
  const [query, setQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authMode, setAuthMode] = useState('signup');
  const [showSignupLanding, setShowSignupLanding] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState('Essentiel');
  const [premiumPhone, setPremiumPhone] = useState('707449987');
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

  const handleAuthSubmit = (event) => {
    event.preventDefault();
    setShowSignupLanding(false);
    setIsLoggedIn(true);
    setActiveTab('compte');
  };

  const handleInstallApp = () => {
    const installPrompt = window.__agriguideInstallPrompt;
    if (installPrompt) {
      installPrompt.prompt();
      installPrompt.userChoice.finally(() => {
        window.__agriguideInstallPrompt = null;
      });
      return;
    }
    const baseUrl = window.location.href.replace(/\/$/, '');
    window.open(baseUrl, '_blank', 'noopener,noreferrer');
  };

  const selectedWeather = weatherByHour[hourIndex];

  useEffect(() => {
    const onBeforeInstallPrompt = (event) => {
      event.preventDefault();
      window.__agriguideInstallPrompt = event;
    };

    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt);
    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt);
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
          <div className="profile-mini">
            <div className="avatar">AD</div>
            <div className="profile-copy">
              Abdou Diop
              <small>Gratuit • 3 jours</small>
            </div>
          </div>
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

          {activeTab === 'premium' && (
            <section className="section-block premium-block">
              <div className="section-header">
                <h2>Premium</h2>
              </div>
              <div className="card-grid three-grid plans-grid">
                {premiumPlans.map((plan) => (
                  <article key={plan.name} className={`plan-card ${plan.accent} ${selectedPlan === plan.name ? 'selected-plan' : ''}`}>
                    <span className="plan-name">{plan.name}</span>
                    <div className="plan-price">{plan.price}</div>
                    <p>{plan.feat}</p>
                    <div className="plan-payment">Paiement : {plan.payment}</div>
                    <button type="button" className="button button-primary" onClick={() => setSelectedPlan(plan.name)}>Choisir</button>
                  </article>
                ))}
              </div>

              <div className="payment-box">
                <div className="payment-title">Paiement premium</div>
                <div className="payment-number">Numéro de paiement : <strong>{premiumPhone}</strong></div>
                <div className="payment-legend">Montant du plan choisi : <strong>{premiumPlans.find((plan) => plan.name === selectedPlan)?.price || '1 000 FCFA'}</strong></div>
                <div className="payment-actions">
                  <button type="button" className="button button-primary">Confirmer le paiement</button>
                  <button type="button" className="button button-secondary">Envoyer la preuve</button>
                </div>
              </div>
            </section>
          )}

          {activeTab === 'compte' && (
            !isLoggedIn ? (
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
                      <span className="tag">Sécurisé</span>
                    </div>
                    <div className="auth-tabs">
                      <button type="button" className={authMode === 'signup' ? 'active' : ''} onClick={() => setAuthMode('signup')}>Inscription</button>
                      <button type="button" className={authMode === 'login' ? 'active' : ''} onClick={() => setAuthMode('login')}>Connexion</button>
                    </div>

                    <form className="auth-form" onSubmit={handleAuthSubmit}>
                      {authMode === 'signup' && (
                        <label>
                          Nom complet
                          <input type="text" defaultValue="Abdou Diop" required />
                        </label>
                      )}
                      <label>
                        Téléphone ou e-mail
                        <input type="text" defaultValue={authMode === 'signup' ? 'abdou@agriguide.sn' : 'abdou@agriguide.sn'} required />
                      </label>
                      <label>
                        Mot de passe
                        <input type="password" defaultValue="pass1234" minLength="6" required />
                      </label>
                      <label>
                        Pays où vous cultivez
                        <select defaultValue={selectedCountry}>
                          {countries.map((country) => (
                            <option key={country} value={country}>{country}</option>
                          ))}
                        </select>
                      </label>
                      <button type="submit" className="button button-primary full-width">{authMode === 'signup' ? 'Créer mon compte' : 'Se connecter'}</button>
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
                    <div className="avatar big-avatar">AD</div>
                    <div>
                      <h4>Abdou Diop</h4>
                      <p>abdou@agriguide.sn • pays: Sénégal</p>
                    </div>
                  </div>
                  <div className="stats-grid">
                    {accountStats.map((stat) => (
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
                  <button type="button" className="button button-secondary" onClick={() => setIsLoggedIn(false)}>Se déconnecter</button>
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
