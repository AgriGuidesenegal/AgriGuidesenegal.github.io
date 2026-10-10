# AgriGuide

Prototype web installable pour découvrir des cultures, consulter des conseils
agricoles et suivre les actualités du secteur au Sénégal.

## Lancer localement

À la racine du projet :

```powershell
python -m http.server 8000
```

Puis ouvrir `http://localhost:8000`. Une connexion est requise pour charger
React, Babel et les polices. Les photos des cultures sont incluses dans le
projet.

## Actualités et vidéos

`scripts/update_news.py` met à jour `news.json` depuis les flux publics de
l’Agence de Presse Sénégalaise et du Ministère de l’Agriculture du Sénégal,
ainsi que le flux vidéo YouTube officiel du ministère. Le site ouvre les articles
à leur source et lit les vidéos dans le lecteur YouTube. Il indique les erreurs
de chargement au lieu de présenter d’anciens résultats comme des informations à
jour.

L’action GitHub Pages actualise ces flux toutes les quatre heures et à chaque
publication. Dans l’onglet **Actions** du dépôt, vérifier que les exécutions sont
autorisées.

## Photos

Les images de cultures sont conservées dans `assets/crops/`. Le fichier
`crop-photo-credits.json` associe chaque culture à sa photo et aux informations
d’auteur et de licence Creative Commons. Un lien de crédit est affiché sous la
photo. Les cartes, les suggestions d’accueil et les fiches de culture utilisent
cette même image locale ; si une photo est indisponible, l’application affiche
le nom de la culture au lieu d’une image de remplacement potentiellement erronée.
Ne pas dissocier ces attributions des images lors de la redistribution.

## Transformation et outils pour agronomes

L’onglet **Transformation** présente des pistes générales de valorisation pour
la mangue, le mil, le fonio, l’arachide, le moringa et la tomate. Les procédés
de conservation, conditions d’hygiène et durées ne sont pas certifiés : ils
doivent être validés pour le produit, l’équipement et le marché visés.

Les forfaits Premium prévus sont 1 000 FCFA (Essentiel), 4 000 FCFA (Pro) et
8 000 FCFA (Expert). Chaque palier inclut les précédents et ajoute des fiches
cultures avec problèmes fréquents et pistes de solution, des analyses de sols,
des guides de transformation et des dossiers de veille pédagogique. Des
illustrations SVG originales complètent les cultures sans photo autorisée
disponible ; les photographies sous licence gardent leurs crédits. L’assistant
actuel fournit des réponses générales guidées, sans modèle d’IA distant. Les
conseils de diagnostic et les procédés de transformation restent à confirmer
auprès de spécialistes locaux.

La recherche de cultures ouvre l’onglet **Cultures** avec les résultats filtrés.
La cloche affiche des notifications indicatives de démonstration, pas des
alertes push.

L’onglet **Météo** charge les conditions et prévisions horaires d’Open-Meteo
pour la capitale du pays choisi ; il nécessite une connexion Internet. Les
outils gratuits de campagne calculent une recette estimative à partir des
données saisies. La marge et le seuil de rentabilité ne sont visibles que dans
l’aperçu Premium simulé. Dans **Assistant IA**, les réponses automatiques sont
des conseils généraux guidés, sans modèle d’IA distant ni diagnostic professionnel.
Les fiches de culture donnent des repères à vérifier localement.

L’authentification réelle utilise Supabase. Après la création du projet,
renseigner son URL et sa clé publishable dans `supabase-config.js`, puis activer
la confirmation d’e-mail dans les réglages Authentication de Supabase. Le
compte propose ensuite une validation du téléphone par code à usage unique
(OTP), via `auth.updateUser({ phone })` et `auth.verifyOtp`. Pour que les SMS
soient réellement envoyés, activer la connexion téléphonique et configurer un
fournisseur SMS dans Supabase Auth. Les numéros doivent être saisis au format
international E.164 (par exemple `+221771234567`). Le code ne doit jamais être
demandé à un autre utilisateur ni transmis au service client.

La clé publishable est prévue pour le navigateur ; ne jamais y mettre de clé
`service_role` ni de mot de passe de base de données. L’application web
installable reste publiée séparément en HTTPS sur GitHub Pages. Le service
client est joignable à `daoudadiankha22@gmail.com`.

## Paiement Premium

Les tarifs affichés sont prévisionnels. Le simulateur a été retiré, mais aucun
paiement ni accès Premium réel n’est actif ; les boutons d’achat restent
désactivés. Ne transférez pas d’argent. Avant la commercialisation, intégrer un
fournisseur de paiement, une validation d’abonnement côté serveur, des règles
d’accès persistantes liées au compte et les secrets dans l’environnement serveur
(jamais dans le code du navigateur). Les contrôles d’accès front-end seuls ne
sécurisent pas des contenus payants. PayDunya n’est pas encore intégré : le
code de cette application ne doit pas être présenté comme acceptant des
paiements, même après une confirmation par case à cocher.

Numéro marchand communiqué pour la future configuration PayDunya : `777267357`.
Cette référence n’est pas utilisée par l’application statique et ne permet pas,
à elle seule, d’effectuer ou de confirmer un paiement.

## Publication GitHub Pages

Le workflow `.github/workflows/deploy-pages.yml` prépare `dist/` et le publie
sur GitHub Pages. Après avoir ajouté et poussé ces fichiers dans un dépôt GitHub
dont la branche principale s’appelle `main` :

1. Ouvrir **Settings → Pages** et choisir **GitHub Actions** comme source.
2. Ouvrir **Actions** et attendre la fin de **Deploy AgriGuide to GitHub Pages**.
3. Récupérer l’adresse publique dans l’environnement `github-pages` ou dans le
   résumé du déploiement. Elle aura la forme
   `https://<nom-utilisateur>.github.io/<nom-du-depot>/`.

Le bouton **Télécharger l’app** propose l’installation PWA quand le navigateur
la prend en charge. Sur iPhone, utiliser **Partager → Sur l’écran d’accueil**.
Une URL publique courte personnalisée nécessite un nom de dépôt adapté ou un
domaine configuré dans GitHub Pages.

## Limites du prototype

Si `supabase-config.js` n’est pas renseigné, l’inscription et la connexion sont
désactivées : aucun compte de démonstration n’est créé ni accepté. Le paiement
premium et le contrôle des formules ne sont pas encore reliés à un serveur ; ne
pas vendre les contenus verrouillés ni encaisser d’argent sur cette base. Les
conseils agronomiques et de transformation restent indicatifs. Une publication
sur GitHub Pages ne remplace ni un backend de paiement ni la validation des
recommandations par des spécialistes locaux.
