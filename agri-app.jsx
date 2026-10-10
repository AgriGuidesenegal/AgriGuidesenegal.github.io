
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
  { id: 'service-client', label: 'Service client', icon: '✉️' },
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

function CropPhoto({ photo, name, className }) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [photo?.file]);

  if (!photo?.file || failed) {
    return (
      <div className={`crop-photo-placeholder ${className || ''}`} role="img" aria-label={`Photo indisponible pour ${name}`}>
        🌱 {name}
      </div>
    );
  }

  return (
    <img
      className={className}
      src={photo.file}
      alt={name}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

const countryProfiles = {
  Sénégal: { climate: 'Tropical sec', season: 'Saison des pluies', description: 'Le climat est chaud avec de fortes variations de pluviométrie selon les régions.', rainfall: '250 à 700 mm', advice: 'Prioriser les cultures tolérantes à la sécheresse et le paillage.' },
  Mali: { climate: 'Tropical sec', season: 'Saison des pluies', description: 'Les zones soudaniennes demandent un calendrier serré entre semis et précipitations.', rainfall: '350 à 800 mm', advice: 'Gérer les réserves d’eau et les semis précoces.' },
  'Burkina Faso': { climate: 'Tropical sec', season: 'Saison des pluies', description: 'La pluviométrie est courte mais utile pour les céréales et les légumineuses.', rainfall: '400 à 900 mm', advice: 'Adopter des variétés courtes et des paillages protecteurs.' },
  'Côte d’Ivoire': { climate: 'Tropical humide', season: 'Saison des pluies', description: 'Le climat est plus humide, avec une forte pression sur le drainage et la protection des sols.', rainfall: '1200 à 2000 mm', advice: 'Surveiller le drainage et la gestion des maladies foliaires.' },
  Ghana: { climate: 'Tropical humide', season: 'Saison des pluies', description: 'Le climat est favorable aux cultures maraîchères et aux cultures de rente.', rainfall: '800 à 1500 mm', advice: 'Favoriser le paillage et les travaux tôt le matin.' },
};

const countryCapitals = {
  Sénégal: 'Dakar',
  Mali: 'Bamako',
  'Burkina Faso': 'Ouagadougou',
  Niger: 'Niamey',
  Mauritanie: 'Nouakchott',
  Gambie: 'Banjul',
  Tchad: 'N’Djamena',
  'Côte d’Ivoire': 'Abidjan',
  Ghana: 'Accra',
  Togo: 'Lomé',
  Bénin: 'Cotonou',
  Nigeria: 'Abuja',
  Guinée: 'Conakry',
  'Guinée-Bissau': 'Bissau',
  'Sierra Leone': 'Freetown',
  Liberia: 'Monrovia',
  Cameroun: 'Yaoundé',
  Gabon: 'Libreville',
  Congo: 'Brazzaville',
  'RD Congo': 'Kinshasa',
  Maroc: 'Rabat',
  Algérie: 'Alger',
  Tunisie: 'Tunis',
  France: 'Paris',
  Belgique: 'Bruxelles',
  Suisse: 'Berne',
  Canada: 'Ottawa',
  'Autre pays': 'Dakar',
};

const getWeatherCondition = (code) => {
  if (code === 0) return 'Ciel dégagé';
  if (code === 1) return 'Peu nuageux';
  if (code === 2) return 'Partiellement nuageux';
  if (code === 3) return 'Couvert';
  if ([45, 48].includes(code)) return 'Brouillard';
  if ([51, 53, 55, 56, 57].includes(code)) return 'Bruine';
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return 'Pluie';
  if ([71, 73, 75, 77, 85, 86].includes(code)) return 'Neige';
  if ([95, 96, 99].includes(code)) return 'Orage';
  return 'Conditions variables';
};

const getWeatherAdvice = (weather) => {
  if (!weather) return 'La météo locale apparaîtra après le chargement des prévisions.';
  if (weather.rainRisk >= 60) return 'Pluie probable : vérifiez le drainage et évitez les traitements avant les averses.';
  if (weather.temp >= 35) return 'Forte chaleur : faites les travaux tôt et surveillez l’humidité au pied des plants.';
  if (weather.wind >= 30) return 'Vent soutenu : reportez les pulvérisations et protégez les jeunes plants.';
  return 'Consultez l’humidité du sol avant d’arroser et privilégiez les travaux aux heures fraîches.';
};

const answerAgronomyQuestion = (question) => {
  const text = question.toLocaleLowerCase('fr');
  if (/jaun|tache|malad|feuille|ravageur|insect|chenille|puceron/.test(text)) {
    return 'Pour identifier le problème, observez si les symptômes touchent les feuilles jeunes ou anciennes, le dessous des feuilles et plusieurs plants. Vérifiez aussi l’humidité et le drainage du sol. Isolez les plants très atteints si possible et prenez une photo nette. Évitez tout pesticide sans diagnostic local ; demandez conseil à un technicien si les dégâts progressent.';
  }
  if (/arros|eau|irrig|sec|sécheresse/.test(text)) {
    return 'Arrosez de préférence tôt le matin, lentement au pied des plants. Vérifiez d’abord l’humidité à quelques centimètres de profondeur : un sol sableux sèche vite, tandis qu’un sol argileux reste humide plus longtemps. Le paillage limite l’évaporation ; évitez l’eau stagnante qui favorise les maladies.';
  }
  if (/mil|sorgho|semis|semer|plant|graine|fonio/.test(text)) {
    return 'Pour les céréales comme le mil et le sorgho, choisissez une variété adaptée à la durée des pluies de votre zone et utilisez des semences de qualité. Attendez une pluie réellement installée plutôt qu’une première averse isolée, puis désherbez tôt. Les dates et espacements varient selon la variété et la région : confirmez-les auprès d’un conseiller agricole local.';
  }
  if (/sol|compost|engrais|fertil|fumier/.test(text)) {
    return 'Avant d’ajouter de l’engrais, observez la texture du sol et l’état de la culture, et si possible faites analyser le sol. Le compost mûr et le paillage améliorent souvent la structure. La dose d’engrais dépend de la culture et du sol : suivez une recommandation locale plutôt qu’une dose générale.';
  }
  return 'Je peux vous orienter sur le semis, l’arrosage, le sol ou les feuilles jaunies. Précisez la culture, votre région, les symptômes observés et depuis quand ils ont commencé. Ces conseils sont indicatifs et ne remplacent pas un diagnostic sur place.';
};

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
  { name: 'Ferrugineux tropical', label: 'Deck-Dior', description: 'Sol minéral fréquent en zone soudanienne, avec une fertilité variable selon la profondeur et la matière organique.', advantage: 'Adapté à plusieurs cultures pluviales quand il est bien couvert.', limit: 'Peut être pauvre en matière organique et sensible au ruissellement.', improvement: 'Garder un couvert végétal, restituer les résidus sains et limiter l’érosion.', crops: ['Bissap', 'Mil', 'Arachide'], premiumPlan: 'Essentiel', premiumTip: 'Comparez une petite zone avec apport organique à une zone témoin et observez infiltration, levée et vigueur.' },
  { name: 'Hydromorphe', label: 'Deck humide', description: 'Sol temporairement ou durablement engorgé, dont l’usage dépend du niveau et de la durée de saturation.', advantage: 'Peut convenir à des cultures adaptées à l’eau et aux aménagements locaux.', limit: 'Asphyxie racinaire possible hors des cultures et périodes adaptées.', improvement: 'Évaluez le drainage et la durée d’inondation avant de choisir la culture.', crops: ['Riz'], premiumPlan: 'Pro', premiumTip: 'Notez les périodes d’engorgement, la profondeur d’eau et les zones d’écoulement avant tout aménagement.' },
  { name: 'Limono-argileux', label: 'Deck', description: 'Texture équilibrée à tendance argileuse qui retient l’eau et demande une gestion prudente du travail du sol.', advantage: 'Bonne réserve utile lorsque la structure reste aérée.', limit: 'Se compacte facilement lorsqu’il est travaillé trop humide.', improvement: 'Intervenez sur sol ressuyé et maintenez des apports organiques.', crops: ['Maïs', 'Gombo', 'Niébé'], premiumPlan: 'Expert', premiumTip: 'Comparez la structure à plusieurs profondeurs et évitez le passage d’outils lourds sur sol humide.' },
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
  { name: 'Bissap', type: 'Nouvelle', soil: 'Ferrugineux tropical', cycle: '120 jours', water: 'Modéré', image: '', illustration: 'assets/crops/illustration-bissap.svg', note: 'Culture de feuilles et calices, à adapter à la saison et au débouché local.', premiumPlan: 'Essentiel', premiumTip: 'Suivez séparément la récolte des feuilles et des calices, puis comparez les dates, volumes et débouchés de chaque lot.', premiumProblems: [{ problem: 'Levée irrégulière', signs: 'Manques en lignes ou jeunes plants de tailles différentes.', response: 'Vérifiez la fraîcheur des semences, l’humidité du lit de semences et la formation d’une croûte. Réensemencez seulement les zones manquantes après contrôle de la cause.' }, { problem: 'Feuilles tachées ou jaunies', signs: 'Taches, jaunissement ou perte de vigueur sur une partie des plants.', response: 'Observez plusieurs plants et le dessous des feuilles, retirez les débris très atteints si cela est faisable et évitez de mouiller le feuillage. Faites confirmer la cause localement avant tout traitement.' }, { problem: 'Qualité variable des calices', signs: 'Couleur et état différents entre les lots récoltés.', response: 'Triez et identifiez les lots, notez les dates et protégez le produit de la poussière et de l’humidité. Faites valider les paramètres de séchage et de stockage.' }] },
  { name: 'Corète potagère', type: 'Nouvelle', soil: 'Limon', cycle: '60 jours', water: 'Modéré', image: '', illustration: 'assets/crops/illustration-corete.svg', note: 'Légume-feuille récolté jeune ; échelonnez les semis et vérifiez les débouchés locaux.', premiumPlan: 'Essentiel', premiumTip: 'Échelonnez les semis, récoltez selon les usages locaux et notez le poids commercialisable de chaque coupe.', premiumProblems: [{ problem: 'Levée faible', signs: 'Peu de plantules ou levée en plaques.', response: 'Vérifiez la qualité des semences, la profondeur du semis et l’humidité régulière de la surface. Faites un petit test de germination avant un nouveau semis.' }, { problem: 'Feuilles dures ou fibreuses', signs: 'Feuilles qui perdent leur tendreté ou tiges trop développées.', response: 'Ajustez la fréquence de récolte et l’échelonnement des semis à la demande. Une chaleur ou un manque d’eau peut accélérer le durcissement ; vérifiez l’humidité du sol.' }, { problem: 'Feuillage abîmé', signs: 'Trous, morsures ou décoloration des jeunes feuilles.', response: 'Inspectez le dessous du feuillage et les plants tôt le matin pour repérer les ravageurs. Enlevez manuellement les foyers limités si possible et demandez une identification avant traitement.' }] },
  { name: 'Concombre', type: 'Nouvelle', soil: 'Limon', cycle: '65 jours', water: 'Élevé', image: '', illustration: 'assets/crops/illustration-concombre.svg', note: 'Culture maraîchère à croissance rapide, sensible aux à-coups d’eau et à l’humidité stagnante.', premiumPlan: 'Essentiel', premiumTip: 'Suivez l’humidité au pied, le nombre de fruits formés et les pertes par récolte ; évitez les alternances de sécheresse et d’excès d’eau.', premiumProblems: [{ problem: 'Fruits déformés ou amers', signs: 'Fruits irréguliers, amertume ou croissance inégale.', response: 'Vérifiez les variations d’humidité, la chaleur et la fréquence des récoltes. Maintenez une alimentation en eau régulière sans inonder et récoltez selon le stade demandé.' }, { problem: 'Feuilles poudreuses ou tachées', signs: 'Dépôt blanchâtre, taches ou dessèchement progressif du feuillage.', response: 'Examinez plusieurs feuilles et l’évolution dans la parcelle. Évitez de mouiller le feuillage, favorisez l’aération et faites confirmer la maladie avant tout traitement.' }, { problem: 'Fleurs sans fruits', signs: 'Nombreuses fleurs mais peu de fruits qui grossissent.', response: 'Notez si les fleurs sont mâles ou femelles, la présence d’insectes pollinisateurs et les épisodes de forte chaleur. Évitez les traitements non ciblés pendant la floraison.' }] },
  { name: 'Baobab', type: 'Ancienne', soil: 'Sableux', cycle: '730 jours', water: 'Faible', image: '', illustration: 'assets/crops/illustration-baobab.svg', note: 'Espèce pérenne valorisée pour ses feuilles et fruits ; vérifier le site et le matériel végétal.', premiumPlan: 'Pro', premiumTip: 'Planifiez sur plusieurs saisons : provenance des plants, reprise, protection des jeunes sujets et disponibilité des fruits.', premiumProblems: [{ problem: 'Reprise difficile des jeunes plants', signs: 'Flétrissement durable, croissance faible ou mortalité après plantation.', response: 'Vérifiez la qualité du plant, l’état des racines, le contact terre-racines et l’humidité sans engorgement. Protégez du bétail et du dessèchement, et demandez conseil sur la période locale de plantation.' }, { problem: 'Dégâts sur jeunes pousses', signs: 'Pousses coupées, écorce blessée ou plants déracinés.', response: 'Recherchez les traces et identifiez l’origine avant d’agir. Renforcez une protection physique adaptée et contrôlez régulièrement les plants.' }, { problem: 'Production fruitière irrégulière', signs: 'Floraison ou fructification faible ou variable d’une saison à l’autre.', response: 'Notez l’âge, l’état sanitaire, la floraison, la pluie et les pratiques de chaque arbre. Vérifiez les facteurs de pollinisation et les conditions locales avec un spécialiste.' }] },
  { name: 'Voandzou', type: 'Ancienne', soil: 'Sableux', cycle: '120 jours', water: 'Faible', image: '', illustration: 'assets/crops/illustration-voandzou.svg', note: 'Légumineuse alimentaire rustique ; choisissez des semences saines et adaptez le semis aux pluies locales.', premiumPlan: 'Pro', premiumTip: 'Notez l’origine des semences, la densité de levée, les dates de floraison et les pertes à la récolte pour comparer les parcelles.', premiumProblems: [{ problem: 'Mauvaise levée', signs: 'Graines manquantes ou plantules qui disparaissent après la levée.', response: 'Contrôlez la germination, l’humidité et la profondeur de semis. Recherchez les dégâts d’insectes ou d’oiseaux avant de ressemer.' }, { problem: 'Croissance faible', signs: 'Plants petits ou jaunissants malgré des pluies présentes.', response: 'Observez le drainage, la concurrence des adventices et l’état des racines. Évitez les apports d’azote à l’aveugle et demandez un avis local si le problème persiste.' }, { problem: 'Pertes au stockage', signs: 'Grains troués, poudre ou insectes observés dans les sacs.', response: 'Séparez les lots suspects, contrôlez le séchage et inspectez régulièrement le stockage. Utilisez des contenants propres et adaptés aux recommandations locales.' }] },
  { name: 'Néré', type: 'Ancienne', soil: 'Latéritique', cycle: '730 jours', water: 'Faible', image: '', illustration: 'assets/crops/illustration-nere.svg', note: 'Arbre agroforestier à croissance lente, à intégrer dans un projet de long terme.', premiumPlan: 'Expert', premiumTip: 'Évaluez la compatibilité avec les cultures associées et les usages locaux avant d’installer un verger à long terme.', premiumProblems: [{ problem: 'Croissance lente ou arrêtée', signs: 'Peu de nouvelles feuilles, tige peu développée ou dépérissement localisé.', response: 'Contrôlez l’humidité, la concurrence des herbes, les blessures et l’état du collet. Dégagez prudemment la concurrence immédiate, protégez le plant et comparez avec des sujets voisins.' }, { problem: 'Stress hydrique après plantation', signs: 'Feuilles flétries ou desséchées, surtout lors des périodes chaudes.', response: 'Vérifiez l’humidité au niveau des racines et l’infiltration. Utilisez un paillage sans le coller au tronc et adaptez l’arrosage à la pluie et au sol ; évitez l’eau stagnante.' }, { problem: 'Dégâts ou mortalité en plantation', signs: 'Écorce endommagée, tige cassée ou plants manquants.', response: 'Cartographiez les pertes, identifiez les dégâts (animaux, outils ou ravageurs) et installez une protection physique appropriée. Remplacez les plants seulement après avoir réduit la cause.' }] },
  { name: 'Gingembre', type: 'Nouvelle', soil: 'Limon', cycle: '270 jours', water: 'Modéré', image: '', illustration: 'assets/crops/illustration-gingembre.svg', note: 'Rhizome à installer dans un sol meuble, riche en matière organique et bien drainé.', premiumPlan: 'Expert', premiumTip: 'Suivez l’état sanitaire du rhizome, le drainage et les coûts de récolte sur une petite parcelle pilote.', premiumProblems: [{ problem: 'Pourriture du rhizome', signs: 'Plants qui jaunissent ou flétrissent par foyers, rhizomes mous ou malodorants.', response: 'Vérifiez le drainage et l’humidité, marquez les foyers et retirez les plants atteints avec précaution. N’utilisez pas ces rhizomes comme semences et demandez une identification locale avant traitement.' }, { problem: 'Levée faible ou hétérogène', signs: 'Manques, pousses tardives ou vigueur très différente sur la parcelle.', response: 'Contrôlez la qualité et la germination du matériel végétal, la profondeur de plantation et l’humidité. Utilisez des lots sains et comparez de petites zones avant d’étendre la culture.' }, { problem: 'Feuilles jaunissantes', signs: 'Jaunissement diffus ou par plaques, parfois associé à un ralentissement.', response: 'Examinez l’humidité, l’écoulement de l’eau, l’état des racines et la répartition des symptômes. Corrigez d’abord le problème de drainage ou d’arrosage confirmé, sans appliquer d’engrais ou pesticide à l’aveugle.' }] },
  { name: 'Ail', type: 'Nouvelle', soil: 'Limon', cycle: '120 jours', water: 'Modéré', image: '', illustration: 'assets/crops/illustration-ail.svg', note: 'Bulbe à conduire dans un sol meuble et drainant ; calendrier et variétés à vérifier selon la zone.', premiumPlan: 'Expert', premiumTip: 'Sélectionnez des caïeux sains, consignez la date de plantation et surveillez le séchage après récolte.', premiumProblems: [{ problem: 'Jaunissement précoce', signs: 'Pointes ou feuilles qui jaunissent avant la maturité attendue.', response: 'Vérifiez l’humidité, le drainage, les racines et la présence de lésions ou de ravageurs. Comparez des plants sains et atteints avant d’appliquer un apport.' }, { problem: 'Bulbes petits ou divisés', signs: 'Bulbes peu développés, irréguliers ou divisés en caïeux de taille variable.', response: 'Examinez la qualité du matériel de plantation, la densité, la période de plantation et l’accès à l’eau. Notez les résultats par lot et demandez conseil sur les variétés adaptées.' }, { problem: 'Moisissure après récolte', signs: 'Bulbes mous ou présentant des moisissures en stockage.', response: 'Triez les bulbes abîmés, séchez et stockez uniquement selon un protocole adapté, dans un lieu ventilé. Vérifiez les conditions locales de conservation et ne commercialisez pas les lots suspects.' }] },
];

const news = [
  { title: 'Irrigation goutte à goutte : les paysans gagnent en efficacité', source: 'Ministère de l’Agriculture', tag: 'Irrigation', date: '4 jours' },
  { title: 'Semences tolérantes à la sécheresse en hausse au Sénégal', source: 'Presse nationale', tag: 'Semences', date: '1 semaine' },
  { title: 'Agriculture de conservation : premières retombées sur le terrain', source: 'Organisation régionale', tag: 'Agroécologie', date: '10 jours' },
];

const premiumNewsBriefings = [
  {
    plan: 'Essentiel',
    title: 'Veille de saison : sécuriser les semis',
    summary: 'Repères pour suivre les pluies locales, noter les dates de semis et comparer la levée par parcelle.',
    takeaway: 'Un calendrier local et des observations consignées valent mieux qu’une date nationale unique.',
  },
  {
    plan: 'Pro',
    title: 'Veille marchés : comparer les débouchés',
    summary: 'Trame pour comparer prix observés, transport, pertes et coûts de conditionnement avant une vente.',
    takeaway: 'Confirmez chaque prix auprès de plusieurs marchés ; cette fiche ne fournit pas de cotation en temps réel.',
  },
  {
    plan: 'Expert',
    title: 'Veille transformation : du lot au marché',
    summary: 'Points de contrôle pour relier qualité du lot, exigences d’hygiène, coûts d’atelier et débouchés.',
    takeaway: 'Validez les procédés, obligations et exigences du marché avec les services compétents avant toute production.',
  },
];

const premiumPlans = [
  { name: 'Essentiel', price: '1 000 FCFA', feat: '3 fiches culture enrichies avec problèmes fréquents et pistes de solution • 1 sol détaillé • 1 guide de transformation • 1 dossier de veille • 5 réponses agricoles guidées approfondies', professionalFeature: 'Carnet de lot et de récolte, calcul de marge et prix minimum indicatif.', accent: 'primary', payment: 'Paiement à connecter' },
  { name: 'Pro', price: '4 000 FCFA', feat: '5 fiches culture détaillées • 2 sols • 2 guides de transformation • 2 dossiers de veille • 20 réponses guidées • scénarios de rendement', professionalFeature: 'Comparaison de scénarios, coût par hectare et trame qualité par lot.', accent: 'gold', payment: 'Paiement à connecter' },
  { name: 'Expert', price: '8 000 FCFA', feat: '8 fiches culture détaillées • 3 sols • 3 guides de transformation • 3 dossiers de veille • 50 réponses guidées • diagnostic structuré', professionalFeature: 'Budget complet, charges additionnelles, analyse de sensibilité et dossier de projet.', accent: 'deep', payment: 'Paiement à connecter' },
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
  {
    name: 'Calices de bissap séchés',
    crop: 'Bissap',
    icon: '🌺',
    product: 'Calices triés et séchés',
    requiredPlan: 'Essentiel',
    steps: ['Trier les calices et retirer les éléments abîmés.', 'Laver à l’eau potable et égoutter dans un espace propre.', 'Sécher selon un procédé alimentaire validé pour le produit.', 'Conditionner dans un emballage propre et protéger de l’humidité.'],
    watch: 'Vérifier le procédé, l’humidité finale et les règles d’étiquetage avec un technicien avant commercialisation.',
  },
  {
    name: 'Poudre de fruit de baobab',
    crop: 'Baobab',
    icon: '🌳',
    product: 'Pulpe triée et conditionnée',
    requiredPlan: 'Pro',
    steps: ['Sélectionner des fruits sains et propres, puis écarter les lots suspects.', 'Séparer la pulpe dans un espace propre avec du matériel adapté.', 'Tamiser et contrôler l’absence de corps étrangers.', 'Conditionner et identifier le lot selon les exigences locales.'],
    watch: 'Faire vérifier la qualité sanitaire, l’étiquetage et les conditions de stockage par les services compétents.',
  },
  {
    name: 'Gingembre séché',
    crop: 'Gingembre',
    icon: '🫚',
    product: 'Tranches ou poudre de gingembre',
    requiredPlan: 'Expert',
    steps: ['Trier les rhizomes et retirer les parties détériorées.', 'Laver avec de l’eau potable et préparer avec des outils propres.', 'Sécher selon un procédé validé pour le produit et l’équipement.', 'Broyer si nécessaire, puis conditionner dans un espace propre.'],
    watch: 'Ne pas déduire une durée de conservation sans validation du procédé et contrôle du produit.',
  },
];

const professionalExclusives = [
  {
    plan: 'Essentiel',
    format: 'Fiche terrain',
    name: 'Carnet de lot et de récolte',
    summary: 'Suivez l’origine de la récolte, les opérations réalisées, les dates, les pertes observées et le stockage.',
    details: ['Parcelle, culture, variété et date de récolte', 'Quantité récoltée, pertes observées et motif', 'Lot, lieu de stockage et prochaine vérification'],
  },
  {
    plan: 'Pro',
    format: 'Outil de travail',
    name: 'Qualité et coût de transformation',
    summary: 'Trame de contrôle par lot et calcul des coûts à compléter avec vos prix, mesures et rendements observés.',
    details: ['Rendement entrée/sortie et pertes par étape', 'Matières premières, main-d’œuvre, énergie et emballage', 'Comparer coût par lot et coût par kilogramme vendu'],
  },
  {
    plan: 'Expert',
    format: 'Dossier technique',
    name: 'Atelier, traçabilité et débouchés',
    summary: 'Préparez une étude d’atelier, les besoins en équipements et un plan de commercialisation à vérifier localement.',
    details: ['Capacité visée, équipements, énergie et besoin en eau', 'Traçabilité des lots, hygiène et contrôles à valider', 'Investissement, charges, risques et débouchés à confirmer'],
  },
];

const demoNotifications = [
  { id: 'season', title: 'Conseil de saison', message: 'Surveillez les pluies locales avant les semis.', tab: 'maintenant' },
  { id: 'weather', title: 'Météo agricole', message: 'Consultez les prévisions avant de planifier les travaux.', tab: 'meteo' },
  { id: 'news', title: 'Veille agricole', message: 'Des dossiers de veille sont présentés dans Actualités.', tab: 'actualites' },
];

function App() {
  const [activeTab, setActiveTab] = useState('maintenant');
  const [selectedCountry, setSelectedCountry] = useState('Sénégal');
  const [weatherData, setWeatherData] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState('');
  const [weatherRefresh, setWeatherRefresh] = useState(0);
  const [hourIndex, setHourIndex] = useState(0);
  const [soilFilter, setSoilFilter] = useState('Tous');
  const [query, setQuery] = useState('');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState(demoNotifications.map((notification) => ({ ...notification, read: false })));
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [assistantQuestion, setAssistantQuestion] = useState('');
  const [assistantMessages, setAssistantMessages] = useState([
    { role: 'assistant', text: 'Bonjour ! Décrivez votre culture, votre région et ce que vous observez ; je vous proposerai des pistes générales.' },
  ]);
  const [assistantCrop, setAssistantCrop] = useState('Mil');
  const [toolCrop, setToolCrop] = useState('Mil');
  const [fieldArea, setFieldArea] = useState('1');
  const [expectedYield, setExpectedYield] = useState('800');
  const [sellingPrice, setSellingPrice] = useState('250');
  const [sowingDate, setSowingDate] = useState(new Date().toISOString().slice(0, 10));
  const [authClient, setAuthClient] = useState(null);
  const [authUser, setAuthUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [authAvailable, setAuthAvailable] = useState(false);
  const [authBusy, setAuthBusy] = useState(false);
  const [authMessage, setAuthMessage] = useState('');
  const [authServiceMessage, setAuthServiceMessage] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneOtp, setPhoneOtp] = useState('');
  const [phoneOtpSent, setPhoneOtpSent] = useState(false);
  const [phoneMessage, setPhoneMessage] = useState('');
  const [phoneBusy, setPhoneBusy] = useState(false);
  const [authMode, setAuthMode] = useState('signup');
  const [showSignupLanding, setShowSignupLanding] = useState(true);
  const [installNotice, setInstallNotice] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('Essentiel');
  const [newsData, setNewsData] = useState(null);
  const [newsLoading, setNewsLoading] = useState(false);
  const [newsError, setNewsError] = useState('');
  const [newsRefresh, setNewsRefresh] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [photoCredits, setPhotoCredits] = useState([]);

  const filteredCrops = useMemo(() => {
    const normalizedQuery = query.toLocaleLowerCase('fr').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return crops.filter((crop) => {
      const normalizedName = crop.name.toLocaleLowerCase('fr').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const matchesQuery = normalizedName.includes(normalizedQuery);
      const matchesSoil = soilFilter === 'Tous' || crop.soil === soilFilter;
      return matchesQuery && matchesSoil;
    });
  }, [query, soilFilter]);

  const unreadNotificationCount = notifications.filter((notification) => !notification.read).length;
  const findCropPhoto = (name) => photoCredits.find((photo) => photo.name === name);
  const getCropPhoto = (crop) => findCropPhoto(crop.name) || (crop.illustration ? { file: crop.illustration } : null);
  const toolCropDetails = crops.find((crop) => crop.name === toolCrop) || crops[0];
  const harvestDate = new Date(`${sowingDate}T12:00:00`);
  harvestDate.setDate(harvestDate.getDate() + Number.parseInt(toolCropDetails.cycle, 10));
  const harvestDateLabel = Number.isNaN(harvestDate.getTime())
    ? 'Choisissez une date de semis'
    : harvestDate.toLocaleDateString('fr-FR', { dateStyle: 'long' });
  const estimatedRevenue = Number(fieldArea) * Number(expectedYield) * Number(sellingPrice);
  // Aucun abonnement validé côté serveur : ne jamais ouvrir un accès payant dans le navigateur.
  const hasPremiumAccess = () => false;
  const premiumContentCatalog = [
    {
      category: 'Fiches de cultures',
      items: crops.filter((crop) => crop.premiumPlan).map((crop) => ({
        plan: crop.premiumPlan,
        name: crop.name,
        summary: `${crop.note} ${crop.premiumProblems?.length || 0} problèmes fréquents avec pistes de vérification et solutions prudentes.`,
      })),
    },
    {
      category: 'Conseils détaillés sur les sols',
      items: soils.filter((soil) => soil.premiumPlan).map((soil) => ({
        plan: soil.premiumPlan,
        name: soil.name,
        summary: soil.premiumTip,
      })),
    },
    {
      category: 'Astuces de transformation',
      items: transformationGuides.filter((guide) => guide.requiredPlan).map((guide) => ({
        plan: guide.requiredPlan,
        name: guide.name,
        summary: guide.watch,
      })),
    },
    {
      category: 'Dossiers de veille agricole',
      items: premiumNewsBriefings.map((briefing) => ({
        plan: briefing.plan,
        name: briefing.title,
        summary: briefing.summary,
      })),
    },
    {
      category: 'Assistant agricole guidé',
      items: premiumPlans.map(({ name: plan }) => ({
        plan,
        name: `Conseils guidés · ${plan}`,
        summary: plan === 'Essentiel'
          ? 'Pack prévu : vérifications simples et suivi sur une zone témoin.'
          : plan === 'Pro'
            ? 'Pack prévu : comparaison de parcelles, observations et prévention.'
            : 'Pack prévu : fiche diagnostic structurée et suivi des risques.',
      })),
    },
  ];

  const handleAssistantSubmit = (event) => {
    event.preventDefault();
    const question = assistantQuestion.trim();
    if (!question) return;
    const cropContext = crops.find((crop) => crop.name === assistantCrop) || crops[0];
    setAssistantMessages((messages) => [
      ...messages,
      { role: 'user', text: question },
      { role: 'assistant', text: `${answerAgronomyQuestion(question)} Repère pour ${cropContext.name} : sol conseillé ${cropContext.soil}, cycle indicatif ${cropContext.cycle} et besoin en eau ${cropContext.water}.` },
    ]);
    setAssistantQuestion('');
  };

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
              phone: String(formData.get('phone') || '').trim(),
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

  const handleSendPhoneOtp = async (event) => {
    event.preventDefault();
    const phone = phoneNumber.trim();
    if (!authClient || !/^\+[1-9]\d{7,14}$/.test(phone)) {
      setPhoneMessage('Saisissez un numéro au format international, par exemple +221771234567.');
      return;
    }

    setPhoneBusy(true);
    setPhoneMessage('');
    try {
      const { error } = await authClient.auth.updateUser({ phone });
      if (error) throw error;
      setPhoneOtpSent(true);
      setPhoneMessage('Code envoyé par SMS. Saisissez-le ci-dessous pour confirmer ce numéro.');
    } catch (error) {
      console.error('Échec de l’envoi du code SMS AgriGuide.', error);
      setPhoneMessage(error.message || 'Impossible d’envoyer le code SMS. Vérifiez le numéro et réessayez.');
    } finally {
      setPhoneBusy(false);
    }
  };

  const handleVerifyPhoneOtp = async (event) => {
    event.preventDefault();
    const phone = phoneNumber.trim();
    const token = phoneOtp.trim();
    if (!authClient || !phone || !token) {
      setPhoneMessage('Saisissez le numéro et le code reçu par SMS.');
      return;
    }

    setPhoneBusy(true);
    setPhoneMessage('');
    try {
      const { data, error } = await authClient.auth.verifyOtp({
        phone,
        token,
        type: 'phone_change',
      });
      if (error) throw error;
      setAuthUser(data.user);
      setPhoneOtp('');
      setPhoneOtpSent(false);
      setPhoneMessage('Numéro confirmé par SMS.');
    } catch (error) {
      console.error('Échec de la confirmation du code SMS AgriGuide.', error);
      setPhoneMessage(error.message || 'Code invalide ou expiré. Demandez un nouveau code et réessayez.');
    } finally {
      setPhoneBusy(false);
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

  useEffect(() => {
    if (authUser) setPhoneNumber(authUser.phone || authUser.user_metadata?.phone || '');
  }, [authUser]);

  const handleSelectPlan = (planName) => {
    setSelectedPlan(planName);
    setActiveTab('premium');
  };

  const handleNotificationOpen = (notification) => {
    setNotifications((items) => items.map((item) => item.id === notification.id ? { ...item, read: true } : item));
    setNotificationsOpen(false);
    setActiveTab(notification.tab);
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

  const selectedWeather = weatherData?.hours[hourIndex] || null;

  useEffect(() => {
    if (activeTab !== 'meteo') return undefined;
    const controller = new AbortController();

    const loadWeather = async () => {
      setWeatherLoading(true);
      setWeatherError('');
      try {
        const locationName = countryCapitals[selectedCountry] || 'Dakar';
        const geocodingUrl = new URL('https://geocoding-api.open-meteo.com/v1/search');
        geocodingUrl.search = new URLSearchParams({
          name: locationName,
          count: '1',
          language: 'fr',
          format: 'json',
        });
        const locationResponse = await fetch(geocodingUrl, { signal: controller.signal });
        if (!locationResponse.ok) throw new Error(`Recherche de la ville impossible (${locationResponse.status}).`);
        const locationData = await locationResponse.json();
        const location = locationData.results?.[0];
        if (!location) throw new Error(`Aucune ville trouvée pour ${selectedCountry}.`);

        const forecastUrl = new URL('https://api.open-meteo.com/v1/forecast');
        forecastUrl.search = new URLSearchParams({
          latitude: String(location.latitude),
          longitude: String(location.longitude),
          current: 'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m',
          hourly: 'temperature_2m,precipitation_probability,weather_code,wind_speed_10m',
          forecast_days: '1',
          timezone: 'auto',
        });
        const forecastResponse = await fetch(forecastUrl, { signal: controller.signal });
        if (!forecastResponse.ok) throw new Error(`Prévisions indisponibles (${forecastResponse.status}).`);
        const forecast = await forecastResponse.json();
        const hours = forecast.hourly.time.map((time, index) => ({
          time,
          hour: time.slice(11, 16),
          temp: Math.round(forecast.hourly.temperature_2m[index]),
          condition: getWeatherCondition(forecast.hourly.weather_code[index]),
          rainRisk: forecast.hourly.precipitation_probability[index] ?? 0,
          wind: forecast.hourly.wind_speed_10m[index] ?? 0,
          text: getWeatherCondition(forecast.hourly.weather_code[index]),
        }));
        const currentHourIndex = hours.findIndex((hour) => hour.time >= forecast.current.time);
        setWeatherData({
          location: location.name,
          timezone: forecast.timezone,
          current: {
            temp: Math.round(forecast.current.temperature_2m),
            feelsLike: Math.round(forecast.current.apparent_temperature),
            humidity: forecast.current.relative_humidity_2m,
            precipitation: forecast.current.precipitation,
            condition: getWeatherCondition(forecast.current.weather_code),
            wind: Math.round(forecast.current.wind_speed_10m),
            time: forecast.current.time,
          },
          hours,
        });
        setHourIndex(Math.max(0, currentHourIndex));
      } catch (error) {
        if (error.name === 'AbortError') return;
        console.error('Impossible de charger la météo locale.', error);
        setWeatherError(error.message || 'La météo est momentanément indisponible. Vérifiez votre connexion puis réessayez.');
        setWeatherData(null);
      } finally {
        if (!controller.signal.aborted) setWeatherLoading(false);
      }
    };

    loadWeather();
    return () => controller.abort();
  }, [activeTab, selectedCountry, weatherRefresh]);

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
    const onAppInstalled = () => {
      window.__agriguideInstallPrompt = null;
      setInstallNotice('AgriGuide est installée. Vous pouvez maintenant l’ouvrir depuis votre écran d’accueil.');
    };

    window.addEventListener('appinstalled', onAppInstalled);
    return () => {
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
              <input
                type="search"
                className="search-input"
                aria-label="Rechercher une culture"
                placeholder="Rechercher une culture"
                value={query}
                onChange={(event) => {
                  const value = event.target.value;
                  setQuery(value);
                  if (value.trim()) {
                    setSoilFilter('Tous');
                    setActiveTab('cultures');
                  }
                }}
              />
            </div>
            <div className="short-link-badge">
              {window.location.hostname === 'localhost' ? 'Version de test' : `${window.location.host}${window.location.pathname}`}
            </div>
            <div className="notification-wrap">
              <button
                type="button"
                className="icon-button"
                aria-label={unreadNotificationCount ? `Notifications, ${unreadNotificationCount} non lues` : 'Notifications'}
                aria-expanded={notificationsOpen}
                onClick={() => setNotificationsOpen((open) => !open)}
              >
                🔔{unreadNotificationCount > 0 && <span className="count-badge">{unreadNotificationCount}</span>}
              </button>
              {notificationsOpen && (
                <div className="notification-panel" role="region" aria-label="Notifications de démonstration">
                  <div className="notification-panel-heading">
                    <strong>Notifications</strong>
                    <button
                      type="button"
                      className="link-button"
                      onClick={() => setNotifications((items) => items.map((item) => ({ ...item, read: true })))}
                      disabled={unreadNotificationCount === 0}
                    >
                      Tout marquer comme lu
                    </button>
                  </div>
                  <p className="notification-demo-note">Conseils indicatifs de démonstration</p>
                  {notifications.map((notification) => (
                    <button
                      type="button"
                      key={notification.id}
                      className={`notification-item ${notification.read ? 'read' : ''}`}
                      onClick={() => handleNotificationOpen(notification)}
                    >
                      <strong>{notification.title}</strong>
                      <span>{notification.message}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
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
          {selectedCrop && (
            <div className="crop-detail-backdrop" onClick={() => setSelectedCrop(null)}>
              <section
                className="crop-detail-dialog"
                role="dialog"
                aria-modal="true"
                aria-labelledby="crop-detail-title"
                onClick={(event) => event.stopPropagation()}
              >
                <button type="button" className="crop-detail-close" aria-label="Fermer les détails" onClick={() => setSelectedCrop(null)}>×</button>
                <div className="crop-detail-heading">
                  <CropPhoto
                    photo={getCropPhoto(selectedCrop)}
                    name={selectedCrop.name}
                    className="crop-detail-image"
                  />
                  <div>
                    <span className="eyebrow">Guide de culture</span>
                    <h2 id="crop-detail-title">{selectedCrop.name}</h2>
                    <p>{selectedCrop.note}</p>
                  </div>
                </div>
                <div className="crop-detail-grid">
                  <div><span>Type</span><strong>{selectedCrop.type === 'Ancienne' ? 'Culture traditionnelle' : 'Culture maraîchère / introduite'}</strong></div>
                  <div><span>Sol conseillé</span><strong>{selectedCrop.soil}</strong></div>
                  <div><span>Cycle indicatif</span><strong>{selectedCrop.cycle}</strong></div>
                  <div><span>Besoin en eau</span><strong>{selectedCrop.water}</strong></div>
                </div>
                <div className="crop-detail-advice">
                  <h3>Conseils pratiques</h3>
                  <ul>
                    <li>Préparez un lit de semences propre et bien drainé ; incorporez du compost mûr avant l’installation.</li>
                    <li>Adaptez la date de semis au début réel des pluies, à la variété et aux conditions de votre localité.</li>
                    <li>Surveillez l’humidité du sol, désherbez tôt et inspectez régulièrement les feuilles et les tiges.</li>
                    <li>Confirmez les espacements, doses d’intrants et traitements recommandés auprès d’un conseiller local.</li>
                  </ul>
                  {selectedCrop.premiumTip && (
                    <p className="crop-premium-tip"><strong>Conseil Premium :</strong> {selectedCrop.premiumTip}</p>
                  )}
                  {selectedCrop.premiumProblems?.length > 0 && (
                    <section className="crop-premium-problems">
                      <h3>Problèmes fréquents et pistes de solution · {selectedCrop.premiumPlan}</h3>
                      {selectedCrop.premiumProblems.map((item) => (
                        <article key={item.problem}>
                          <strong>{item.problem}</strong>
                          <p><strong>À observer :</strong> {item.signs}</p>
                          <p><strong>Piste prudente :</strong> {item.response}</p>
                        </article>
                      ))}
                    </section>
                  )}
                  <p>Ce guide est indicatif : le cycle et les besoins varient selon la variété, la saison et la région.</p>
                </div>
              </section>
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
                    const photo = getCropPhoto(crop);
                    return (
                      <article key={crop.name} className="crop-card compact">
                        <CropPhoto photo={photo} name={crop.name} />
                        <div className="crop-card-body compact-body">
                          <h4>{crop.name}</h4>
                          <div className="meta-row">
                            <span>{crop.soil}</span>
                            <span>{crop.cycle}</span>
                          </div>
                          <p>{crop.tip}</p>
                          {photo?.sourceUrl && (
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
                <span className="tag">Conseils indicatifs</span>
              </div>
              <p className="assistant-disclaimer">Assistant agricole guidé : les réponses automatiques donnent des pistes générales, pas un diagnostic d’expert.</p>
              <div className="assistant-box">
                {assistantMessages.map((message, index) => (
                  <div key={`${message.role}-${index}`} className={`assistant-bubble ${message.role.replace(' ', '-')}`}>
                    {message.text}
                  </div>
                ))}
              </div>
              <form className="assistant-form" onSubmit={handleAssistantSubmit}>
                <label htmlFor="assistant-crop">Culture concernée</label>
                <select id="assistant-crop" value={assistantCrop} onChange={(event) => setAssistantCrop(event.target.value)}>
                  {crops.map((crop) => <option key={crop.name} value={crop.name}>{crop.name}</option>)}
                </select>
                <label htmlFor="assistant-question">Votre question agricole</label>
                <textarea
                  id="assistant-question"
                  value={assistantQuestion}
                  onChange={(event) => setAssistantQuestion(event.target.value)}
                  placeholder="Ex. : Pourquoi les feuilles de mon mil jaunissent-elles ?"
                  rows="3"
                  required
                />
                <div className="assistant-actions">
                  <button type="submit" className="button button-primary">Poser une question</button>
                  {['Arrosage', 'Feuilles jaunies', 'Semer le mil'].map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      className="button button-secondary"
                      onClick={() => setAssistantQuestion(suggestion)}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
                <span className="assistant-footnote">Aucune donnée personnelle n’est envoyée. En cas de dégâts importants, consultez un conseiller local.</span>
              </form>
              <div className="assistant-actions">
                <button type="button" className="button button-secondary" onClick={() => setActiveTab('premium')}>Découvrir les formules</button>
              </div>
              <div className="premium-locked-panel">
                <div className="premium-locked-heading"><span aria-hidden="true">🔒</span><strong>Conseils approfondis Premium</strong></div>
                <p>Les réponses guidées par formule seront accessibles après la connexion d’un paiement et d’un contrôle d’abonnement sécurisés.</p>
                <button type="button" className="link-button" onClick={() => setActiveTab('premium')}>Voir les formules</button>
              </div>
            </section>
          )}

          {activeTab === 'sols' && (
            <section className="section-block">
              <div className="section-header">
                <h2>Les sols</h2>
              </div>
              <div className="card-grid three-grid">
                {soils.map((soil) => {
                  const soilLocked = soil.premiumPlan && !hasPremiumAccess();
                  return (
                    <article key={soil.name} className="info-card">
                      <div className="info-card-top">
                        <h3>{soil.name}</h3>
                        <span>{soil.premiumPlan ? `Premium ${soil.premiumPlan}` : soil.label}</span>
                      </div>
                      <p>{soil.description}</p>
                      {soilLocked ? (
                        <div className="premium-locked-panel">
                          <span>Analyse et conseil pratique inclus dans l’aperçu {soil.premiumPlan}.</span>
                          <button type="button" className="link-button" onClick={() => handleSelectPlan(soil.premiumPlan)}>
                            Voir le forfait {soil.premiumPlan}
                          </button>
                        </div>
                      ) : (
                        <>
                          <ul>
                            <li><strong>Avantage</strong> : {soil.advantage}</li>
                            <li><strong>Limite</strong> : {soil.limit}</li>
                            <li><strong>Amélioration</strong> : {soil.improvement}</li>
                            <li><strong>Cultures</strong> : {soil.crops.join(', ')}</li>
                          </ul>
                          {soil.premiumTip && (
                            <p className="soil-premium-tip"><strong>Conseil de terrain Premium :</strong> {soil.premiumTip}</p>
                          )}
                        </>
                      )}
                    </article>
                  );
                })}
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
                  const photo = getCropPhoto(crop);
                  const cropLocked = crop.premiumPlan && !hasPremiumAccess();
                  return (
                    <article key={crop.name} className="crop-card">
                      <CropPhoto photo={photo} name={crop.name} />
                      <div className="crop-card-body">
                        <div className="crop-type-row">
                          <h3>{crop.name}</h3>
                          <span>{crop.premiumPlan ? `Premium ${crop.premiumPlan}` : crop.type}</span>
                        </div>
                        <div className="meta-row">
                          <span>{crop.soil}</span>
                          <span>{crop.cycle}</span>
                        </div>
                        <p>{crop.note}</p>
                        {crop.premiumTip && !cropLocked && (
                          <p className="crop-premium-tip"><strong>Astuce Premium :</strong> {crop.premiumTip}</p>
                        )}
                        {photo?.sourceUrl && (
                          <a className="photo-credit" href={photo.sourceUrl} target="_blank" rel="noreferrer">
                            Photo : {photo.creator} • {photo.license}
                          </a>
                        )}
                        {cropLocked ? (
                          <button type="button" className="crop-details-button" onClick={() => handleSelectPlan(crop.premiumPlan)}>
                            Voir le forfait {crop.premiumPlan}
                          </button>
                        ) : (
                          <button type="button" className="crop-details-button" onClick={() => setSelectedCrop(crop)}>
                            Voir les détails
                          </button>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
              {filteredCrops.length === 0 && (
                <p className="search-empty-state" role="status">
                  Aucune culture ne correspond à « {query} ». Vérifie l’orthographe ou efface ta recherche.
                  <button type="button" className="link-button" onClick={() => setQuery('')}>Effacer la recherche</button>
                </p>
              )}
            </section>
          )}

          {activeTab === 'outils' && (
            <section className="panel single-panel">
              <div className="panel-head">
                <h3>Outils de planification agricole</h3>
                <span className="tag">Estimations en FCFA</span>
              </div>
              <p>Renseignez vos données pour obtenir une estimation simple. Les résultats dépendent des rendements et prix réels de votre zone.</p>
              <div className="tool-grid">
                <div className="tool-item">
                  <strong>Estimation de campagne</strong>
                  <label>
                    Culture
                    <select value={toolCrop} onChange={(event) => setToolCrop(event.target.value)}>
                      {crops.map((crop) => <option key={crop.name} value={crop.name}>{crop.name}</option>)}
                    </select>
                  </label>
                  <label>
                    Surface (hectares)
                    <input type="number" min="0.01" step="0.01" value={fieldArea} onChange={(event) => setFieldArea(event.target.value)} />
                  </label>
                  <label>
                    Rendement estimé (kg/ha)
                    <input type="number" min="0" step="10" value={expectedYield} onChange={(event) => setExpectedYield(event.target.value)} />
                  </label>
                  <label>
                    Prix de vente estimé (FCFA/kg)
                    <input type="number" min="0" step="5" value={sellingPrice} onChange={(event) => setSellingPrice(event.target.value)} />
                  </label>
                  <div className="tool-results" aria-live="polite">
                    <span>Recette estimée <strong>{Number.isFinite(estimatedRevenue) ? Math.round(estimatedRevenue).toLocaleString('fr-FR') : '0'} FCFA</strong></span>
                  </div>
                </div>
                <div className="tool-item">
                  <strong>Calendrier indicatif</strong>
                  <p>Après un semis de {toolCropDetails.name}, le cycle indicatif est d’environ {toolCropDetails.cycle}.</p>
                  <label>
                    Date de semis prévue
                    <input type="date" value={sowingDate} onChange={(event) => setSowingDate(event.target.value)} />
                  </label>
                  <div className="tool-results">
                    <span>Récolte indicative <strong>{harvestDateLabel}</strong></span>
                    <span>Besoin en eau <strong>{toolCropDetails.water}</strong></span>
                    <span>Sol conseillé <strong>{toolCropDetails.soil}</strong></span>
                  </div>
                  <p className="tool-disclaimer">Vérifiez les dates de semis, la variété et les coûts auprès d’un conseiller ou d’un producteur de votre région.</p>
                </div>
                <div className="tool-item premium-locked-panel">
                  <div className="premium-locked-heading"><span aria-hidden="true">🔒</span><strong>Rentabilité avancée — Premium</strong></div>
                  <p>Calcul de marge, prix minimum, coût par hectare et scénarios détaillés selon le forfait. L’accès payant sera ouvert après la mise en place du paiement sécurisé.</p>
                  <button type="button" className="link-button" onClick={() => setActiveTab('premium')}>Voir les formules et tarifs</button>
                </div>
              </div>
            </section>
          )}

          {activeTab === 'meteo' && (
            <section className="weather-wrap">
              <div className="panel weather-panel">
                <div className="panel-head">
                  <h3>Météo locale</h3>
                  <span className="tag">{weatherData ? weatherData.location : selectedCountry}</span>
                </div>
                {weatherLoading && <p role="status">Chargement des prévisions locales…</p>}
                {weatherError && (
                  <p className="auth-message" role="alert">
                    {weatherError}
                    <button type="button" className="link-button" onClick={() => setWeatherRefresh((value) => value + 1)}>Réessayer</button>
                  </p>
                )}
                {weatherData && selectedWeather && (
                  <>
                    <div className="weather-hero">
                      <div>
                        <div className="temp-big">{weatherData.current.temp}°C</div>
                        <p>Maintenant • {weatherData.current.condition} • Ressenti {weatherData.current.feelsLike}°C</p>
                      </div>
                      <div className="weather-status">{getWeatherAdvice(selectedWeather)}</div>
                    </div>
                    <div className="weather-facts">
                      <span>Humidité <strong>{weatherData.current.humidity}%</strong></span>
                      <span>Vent <strong>{weatherData.current.wind} km/h</strong></span>
                      <span>Pluie actuelle <strong>{weatherData.current.precipitation} mm</strong></span>
                    </div>
                    <label className="weather-hour-control">
                      Prévision à {selectedWeather.hour}
                      <input
                        type="range"
                        min="0"
                        max={weatherData.hours.length - 1}
                        value={hourIndex}
                        onChange={(event) => setHourIndex(Number(event.target.value))}
                        className="hour-slider"
                      />
                    </label>
                    <div className="hour-labels">
                      {weatherData.hours.filter((item) => Number(item.hour.slice(0, 2)) % 4 === 0).map((item) => (
                        <span key={item.time} className={item.time === selectedWeather.time ? 'active' : ''}>{item.hour}</span>
                      ))}
                    </div>
                    <p className="weather-forecast-detail">
                      À {selectedWeather.hour} : {selectedWeather.temp}°C, {selectedWeather.condition.toLocaleLowerCase('fr')} et {selectedWeather.rainRisk}% de risque de pluie.
                    </p>
                  </>
                )}
                <button
                  type="button"
                  className="button button-primary"
                  onClick={() => setWeatherRefresh((value) => value + 1)}
                  disabled={weatherLoading}
                >
                  {weatherLoading ? 'Actualisation…' : 'Actualiser la météo'}
                </button>
              </div>

              <div className="panel small-panel">
                <div className="panel-head">
                  <h3>Conseil agricole</h3>
                  <span className="tag">Selon la météo</span>
                </div>
                <p>{selectedWeather ? getWeatherAdvice(selectedWeather) : 'Le conseil sera adapté dès que les prévisions locales seront chargées.'}</p>
                {weatherData && (
                  <p className="weather-source">
                    Prévisions Open-Meteo pour {weatherData.location}, mises à jour à {weatherData.current.time.slice(11, 16)}.
                  </p>
                )}
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
              <section className="premium-news-block">
                <div className="section-header">
                  <div>
                    <h3>Dossiers de veille Premium</h3>
                    <p>Analyses pédagogiques prévues, distinctes des actualités publiques ci-dessous.</p>
                  </div>
                  <span className="tag">Forfaits Premium</span>
                </div>
                <div className="card-grid three-grid">
                  {premiumNewsBriefings.map((briefing) => (
                    <article className="news-card premium-briefing-card" key={briefing.plan}>
                      <span className="tag">{briefing.plan}</span>
                      <h3>{briefing.title}</h3>
                      <p>Ce dossier pédagogique sera accessible avec le forfait {briefing.plan} après l’activation sécurisée des abonnements.</p>
                      <p className="premium-prototype-note">Ce contenu n’est pas une actualité exclusive vérifiée en temps réel.</p>
                    </article>
                  ))}
                </div>
              </section>
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
                {transformationGuides.map((guide) => {
                  const guideLocked = guide.requiredPlan && !hasPremiumAccess();
                  return (
                    <article className="transformation-card" key={guide.name}>
                      <div className="transformation-card-top">
                        <span className="transformation-icon" aria-hidden="true">{guide.icon}</span>
                        <span className="tag">{guide.requiredPlan ? `${guide.requiredPlan} · ${guide.crop}` : guide.crop}</span>
                      </div>
                      <h3>{guide.name}</h3>
                      <p><strong>Produit :</strong> {guide.product}</p>
                      {guideLocked ? (
                        <div className="premium-locked-panel">
                          <p>Les étapes détaillées seront disponibles avec le forfait {guide.requiredPlan} après l’activation du paiement.</p>
                          <button type="button" className="link-button" onClick={() => handleSelectPlan(guide.requiredPlan)}>
                            Voir le forfait {guide.requiredPlan}
                          </button>
                        </div>
                      ) : (
                        <>
                          <ol className="transformation-steps">
                            {guide.steps.map((step) => <li key={step}>{step}</li>)}
                          </ol>
                          <p className="transformation-watch"><strong>À surveiller :</strong> {guide.watch}</p>
                        </>
                      )}
                    </article>
                  );
                })}
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
                      <div className="exclusive-locked">
                        <span aria-hidden="true">🔒</span>
                        <span>Contenu prévu pour le forfait {exclusive.plan}.</span>
                        <button type="button" className="link-button" onClick={() => handleSelectPlan(exclusive.plan)}>
                          Voir la formule {exclusive.plan}
                        </button>
                      </div>
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
              <p className="premium-prototype-note">Les forfaits et leurs prix sont préparés, mais l’achat en ligne n’est pas encore disponible. Aucun paiement ne sera demandé avant la connexion d’un fournisseur et d’une vérification d’abonnement côté serveur.</p>
              <section className="premium-catalog">
                <div className="section-header">
                  <div>
                    <h3>Accès répartis par formule</h3>
                    <p>Chaque palier inclut les précédents et ajoute des cultures, des conseils et des outils.</p>
                  </div>
                </div>
                <div className="card-grid three-grid premium-catalog-grid">
                  {premiumContentCatalog.map((category) => (
                    <article className="premium-catalog-card" key={category.category}>
                      <h4>{category.category}</h4>
                      {category.items.map((item) => (
                        <div className="premium-catalog-item locked" key={`${category.category}-${item.name}`}>
                          <span className="tag">{item.plan}</span>
                          <strong>{item.name}</strong>
                          <span>{item.summary}</span>
                        </div>
                      ))}
                    </article>
                  ))}
                </div>
                <p className="premium-prototype-note">Les actualités publiques gardent leurs sources ouvertes. Les dossiers de veille sont des exemples pédagogiques, pas des dépêches vérifiées en temps réel.</p>
              </section>
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
                        Contenu prévu pour le forfait {exclusive.plan}
                      </span>
                    </article>
                  ))}
                </div>
                <p className="premium-prototype-note">Les achats et contrôles d’accès restent désactivés jusqu’à l’intégration d’un service de paiement et d’une validation sécurisée côté serveur.</p>
              </section>
              <div className="card-grid three-grid plans-grid">
                {premiumPlans.map((plan) => (
                  <article key={plan.name} className={`plan-card ${plan.accent} ${selectedPlan === plan.name ? 'selected-plan' : ''}`}>
                    <span className="plan-name">{plan.name}</span>
                    <div className="plan-price">Prix prévu : {plan.price}</div>
                    <p>{plan.feat}</p>
                    <p className="plan-pro-exclusive"><strong>Pour les agronomes :</strong> {plan.professionalFeature}</p>
                    <div className="plan-payment">Statut : {plan.payment}</div>
                    <button type="button" className="button button-primary" disabled>
                      Achat bientôt disponible
                    </button>
                  </article>
                ))}
              </div>

              <div className="payment-box" id="premium-payment" aria-live="polite">
                <div className="payment-title">Paiement non activé</div>
                <div className="payment-legend">
                  Aucun achat ou abonnement n’est actuellement possible dans l’application.
                </div>
                <p className="payment-disclaimer">Ne transférez pas d’argent pour ces forfaits avant l’annonce de l’ouverture officielle. Les conseils agricoles sont indicatifs et doivent être confirmés localement.</p>
              </div>
            </section>
          )}

          {activeTab === 'service-client' && (
            <section className="section-block service-client-block">
              <div className="section-header">
                <div>
                  <h2>Service client</h2>
                  <p>Contactez l’équipe AgriGuide pour une question sur votre compte ou l’application.</p>
                </div>
              </div>
              <article className="panel service-contact-card">
                <span className="eyebrow">Assistance par e-mail</span>
                <h3>Nous écrire</h3>
                <p>Décrivez votre demande et indiquez le pays où vous utilisez AgriGuide. N’envoyez jamais votre mot de passe ni un code de vérification.</p>
                <a className="button button-primary" href="mailto:daoudadiankha22@gmail.com?subject=Assistance%20AgriGuide">
                  daoudadiankha22@gmail.com
                </a>
              </article>
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
                      {authMode === 'signup' && (
                        <label>
                          Téléphone pour le code SMS
                          <input
                            type="tel"
                            name="phone"
                            autoComplete="tel"
                            inputMode="tel"
                            placeholder="+221771234567"
                            pattern="[+][1-9][0-9]{7,14}"
                            title="Utilisez le format international, par exemple +221771234567."
                            required
                          />
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
                      {authMode === 'signup' && <p className="auth-message" role="note">Après l’inscription, confirmez votre adresse e-mail depuis le lien reçu. Une fois connecté, vous pourrez valider votre téléphone avec un code SMS.</p>}
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
                      {
                        label: 'Vérification',
                        value: !authUser.email_confirmed_at && !authUser.confirmed_at
                          ? 'E-mail à confirmer'
                          : !authUser.phone_confirmed_at || phoneOtpSent
                            ? 'SMS à confirmer'
                            : 'E-mail et SMS confirmés',
                      },
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
                    <h3>Vérification du compte</h3>
                  </div>
                  <p className="verification-status" role="status">
                    E-mail : {authUser.email_confirmed_at || authUser.confirmed_at ? 'confirmé' : 'en attente de confirmation'}.
                    {' '}Téléphone : {phoneOtpSent
                      ? `code envoyé au ${phoneNumber}, confirmation en attente`
                      : authUser.phone_confirmed_at
                        ? `confirmé (${authUser.phone})`
                        : 'à confirmer par SMS'}.
                  </p>
                  <form className="auth-form phone-verification-form" onSubmit={handleSendPhoneOtp}>
                    <label>
                      Téléphone au format international
                      <input
                        type="tel"
                        autoComplete="tel"
                        inputMode="tel"
                        value={phoneNumber}
                        onChange={(event) => {
                          setPhoneNumber(event.target.value);
                          setPhoneOtpSent(false);
                          setPhoneMessage('');
                        }}
                        placeholder="+221771234567"
                        pattern="[+][1-9][0-9]{7,14}"
                        title="Utilisez le format international, par exemple +221771234567."
                        required
                      />
                    </label>
                    <button type="submit" className="button button-secondary" disabled={phoneBusy || !authAvailable}>
                      {phoneBusy ? 'Envoi en cours…' : authUser.phone_confirmed_at ? 'Vérifier un autre numéro' : 'Envoyer un code SMS'}
                    </button>
                  </form>
                  {phoneOtpSent && (
                    <form className="auth-form phone-verification-form" onSubmit={handleVerifyPhoneOtp}>
                      <label>
                        Code reçu par SMS
                        <input
                          type="text"
                          autoComplete="one-time-code"
                          inputMode="numeric"
                          value={phoneOtp}
                          onChange={(event) => setPhoneOtp(event.target.value)}
                          required
                        />
                      </label>
                      <button type="submit" className="button button-primary" disabled={phoneBusy || !phoneOtp.trim()}>
                        {phoneBusy ? 'Vérification…' : 'Confirmer le téléphone'}
                      </button>
                    </form>
                  )}
                  {phoneMessage && <p className="auth-message" role="status">{phoneMessage}</p>}
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
