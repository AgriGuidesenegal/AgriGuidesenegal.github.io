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
photo. Ne pas dissocier ces attributions des images lors de la redistribution.

## Transformation et outils pour agronomes

L’onglet **Transformation** présente des pistes générales de valorisation pour
la mangue, le mil, le fonio, l’arachide, le moringa et la tomate. Les procédés
de conservation, conditions d’hygiène et durées ne sont pas certifiés : ils
doivent être validés pour le produit, l’équipement et le marché visés.

Les formules Premium affichent des aperçus de carnets de lots, d’outils de coût
et de dossiers d’atelier. Le prototype ne livre pas de dossier technique
confidentiel dans le navigateur. Avant de vendre ces ressources, connecter un
serveur qui contrôle l’abonnement et renvoie le contenu autorisé.

Supabase peut fournir la base PostgreSQL et l’authentification. L’application
web installable reste publiée séparément en HTTPS sur GitHub Pages : ne jamais
intégrer une clé Supabase secrète dans les fichiers accessibles au navigateur.

## Paiement Premium

La démo propose uniquement un transfert manuel par Wave. Le choix d’une formule
met à jour son prix et permet de copier le numéro affiché. Aucun paiement
hébergé, contrôle de transaction ni activation automatique n’est configuré.
Vérifier le numéro et le nom du destinataire avant tout transfert. Ne jamais
demander ni partager de code secret. Pour encaisser réellement et activer les
abonnements, intégrer un agrégateur de paiement côté serveur avant publication
du service payant.

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

L’inscription, la connexion, le paiement premium et le contrôle des formules ne
sont pas encore reliés à un serveur : ce prototype ne doit pas être utilisé
pour protéger des comptes, vendre les contenus verrouillés ni encaisser de
l’argent. Les conseils agronomiques et de transformation restent indicatifs.
Une publication sur GitHub Pages ne remplace ni un backend de paiement ni la
validation des recommandations par des spécialistes locaux.
