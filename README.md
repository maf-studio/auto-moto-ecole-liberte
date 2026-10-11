# Auto-Moto École Liberté : le site

Site de l’Auto-Moto École Liberté, 44 boulevard de la Liberté, 93260 Les Lilas. Réalisé par MAF Studio.

- **27 pages** : accueil, deux pages rubriques (permis auto, permis moto), 11 pages formations (dont 1 en
  brouillon), financement, tarifs, documents d’inscription, à propos, avis, contact, pages légales, plan du
  site, 404.
- **Direction artistique** reprise du dépliant de l’établissement : bleu nuit, bleu pétrole, capitales condensées,
  bandeaux inclinés, lignes de route en pointillés, signature manuscrite « depuis 2010 ».
- **Rien d’inventé** : chaque information inconnue vaut `null` et ce qui en dépend disparaît. Les prix lus sur la
  vitrine ne s’affichent qu’une fois confirmés. Les règles (âges, durées, aides) citent leur source officielle.

## Pile

Astro 7 (sortie statique), adaptateur Vercel, CSS sans framework (variables dans `src/styles/global.css`), aucun
framework côté client. Deux routes rendues à la demande : `/api/demande` (envoi du formulaire) et `/api/jeton`
(anti-spam). Polices auto-hébergées (paquets Fontsource) : aucune requête vers Google au chargement.

Le brief proposait Next.js « si compatible avec l’environnement » : le site suit la pile du studio (Astro), plus
légère pour un site de contenu (zéro JavaScript par défaut, meilleur score Lighthouse), et identique à celle des
autres sites livrés.

## Commandes

```bash
pnpm install
pnpm dev                     # serveur de développement (http://localhost:4321)
pnpm dev:essai               # idem, avec un service d’envoi « essai » : les formulaires s’affichent, rien n’est envoyé
pnpm build                   # astro check, puis astro build
pnpm check:liens             # liens internes du site construit (après pnpm build)
pnpm check:publication       # ce qui manque avant la mise en ligne (mentions légales, prix, logo…)
pnpm test:e2e                # formulaire avec et sans JavaScript, menu mobile, liste des documents
node scripts/controle.mjs    # toutes les pages, 360 et 1440 px : statut, débordement, erreurs, accessibilité (axe)
node scripts/captures.mjs /permis-b dossier 360,1440   # captures d’écran
```

Chromium déjà installé ailleurs : `CHROME_PATH=/chemin/vers/chromium` avant les commandes Playwright.

## Où modifier quoi

Tout le contenu est dans `src/data/` : voir **[MODIFIER-LE-CONTENU.md](./MODIFIER-LE-CONTENU.md)**.

| Donnée | Fichier |
|---|---|
| Coordonnées, horaires, note Google, réseaux, labels, logo, mentions légales, WhatsApp, équipe | `src/data/etablissement.ts` |
| Catalogue des formations (une entrée = une page), tarifs, statut publié ou brouillon | `src/data/formations.ts` |
| Solutions de financement | `src/data/financements.ts` |
| Documents d’inscription | `src/data/documents.ts` |
| FAQ de l’accueil et du financement | `src/data/faq.ts` |
| Avis Google cités | `src/data/avis.ts` |
| Sources officielles et date de vérification | `src/data/sources.ts` |
| Photos associées aux formations | `src/data/photos.ts` |
| Menus | `src/data/navigation.ts` |

## Composants

| Fonction demandée | Composant |
|---|---|
| Header, MobileNavigation | `components/layout/EnTete.astro` (sous-menus, menu mobile en `popover`) |
| Barre d’actions mobile | `components/layout/BarreMobile.astro` |
| Footer | `components/layout/PiedDePage.astro` |
| Hero | `components/accueil/HerosAccueil.astro`, `components/sections/HerosPage.astro` |
| TrustBar | `components/accueil/BandeConfiance.astro` |
| FormationCard, FormationDetail | `components/ui/CarteFormation.astro`, `pages/[formation].astro` |
| FinancingCard | `components/sections/CartesFinancement.astro` |
| ReviewSection | `components/sections/AvisGoogle.astro` |
| FAQAccordion | `components/sections/Questions.astro` |
| ContactForm, QuoteForm | `components/formulaire/FormulaireDemande.astro` (un seul formulaire, trois variantes) |
| CTASection | `components/sections/AppelFinal.astro` |
| OpeningHours | `components/ui/Horaires.astro` (avec « ouvert / fermé » à l’heure de Paris) |
| LocationMap, CookieConsent | `components/ui/CarteGoogle.astro` (carte chargée seulement après accord) et `pages/cookies.astro` |
| DocumentChecklist | `pages/documents-inscription.astro` |
| Breadcrumbs | `components/ui/FilAriane.astro` (+ données structurées) |

## Formulaires

Un seul formulaire pour tout le site (contact, devis, financement), la formation choisie est transmise
automatiquement (`?formation=permis-b` dans l’adresse la présélectionne).

- Envoi réel par **Resend** ou **Brevo**, à l’adresse `CONTACT_TO`, avec « Répondre à » sur l’adresse du demandeur.
- **Jamais d’envoi simulé** : sans service configuré, les formulaires sont remplacés par les moyens directs
  (téléphone, e-mail prérempli avec la formation). En cas d’échec du fournisseur, le visiteur voit une erreur, pas
  une confirmation.
- Anti-spam sans CAPTCHA : champ piège, jeton horodaté signé (3 s minimum), vérification d’origine. Ajouter une
  limite de requêtes sur `/api/demande` dans le pare-feu Vercel.
- Fonctionne sans JavaScript (redirection vers `/demande-envoyee` ou `/demande-erreur`).

## Mise en ligne sur Vercel (pas à pas)

Le site vit pour l’instant dans le dépôt de MAF Studio, dans `clients/auto-moto-ecole-liberte/`. Il est autonome
(son propre `package.json`, son propre `pnpm-workspace.yaml`) et peut être déplacé tel quel dans un dépôt au nom
du client.

1. Vercel → **Add New… → Project** → importer le dépôt.
2. **Root Directory** : `clients/auto-moto-ecole-liberte`. Framework : Astro (détecté). Laisser les commandes par défaut.
3. **Environment Variables** (voir `.env.example`) : `EMAIL_PROVIDER`, `RESEND_API_KEY` (ou `BREVO_API_KEY`),
   `CONTACT_TO`, `CONTACT_FROM`, `FORM_SECRET` (`openssl rand -hex 32`).
4. Chez Resend (ou Brevo) : vérifier le domaine d’expédition, puis renseigner `CONTACT_FROM` sur ce domaine.
5. Déployer. Les pages sont statiques : **après tout ajout de variable, redéployer** pour que les formulaires
   apparaissent.
6. Domaine : l’ajouter dans **Settings → Domains**, puis renseigner `SITE_URL=https://www.le-domaine.fr` et
   redéployer. Tant que le site tourne sur `*.vercel.app`, toutes les pages sont en `noindex` et `robots.txt`
   ferme l’accès : une maquette présentée au client n’entre jamais dans Google.
7. **Firewall** → règle de limite de requêtes sur `/api/demande` (par exemple 5 par minute et par IP).
8. Avant d’ouvrir au public : `pnpm check:publication` ne doit plus rien signaler de bloquant.

## SEO local

- Titre, description, `canonical`, Open Graph et image de partage par page ; un seul `h1` ; sitemap (sans les
  pages légales ni les brouillons) ; `robots.txt` selon le domaine.
- Données structurées `DrivingSchool` + `LocalBusiness` (nom, adresse, téléphone, horaires du bureau, agrément,
  catalogue des formations) et `BreadcrumbList`. **Aucune note ni avis** en données structurées (Google refuse
  les avis qu’un établissement publie sur lui-même) ; pas de géolocalisation tant qu’elle n’est pas relevée.
- Les communes voisines (Bagnolet, Romainville, Le Pré-Saint-Gervais) sont citées une fois, dans un texte vrai ;
  aucune fausse page locale.

## Accessibilité et performance

- Contrôle axe (WCAG 2.2 AA) sans violation sur les 27 adresses, à 360 et 1440 px ; aucun débordement horizontal.
- Navigation au clavier, lien d’évitement, anneau de focus visible, sous-menus au clavier (Échap), menu mobile
  natif (`popover`), FAQ en `details`, contrastes calculés (voir l’en-tête de `global.css`).
- Mouvement : révélations jouées une fois sous la ligne de flottaison, transitions de page natives, tout coupé
  avec « réduire les animations ». Aucun contenu n’attend un script.
- Images en AVIF et WebP, aux dimensions utiles ; polices préchargées avec métriques de repli.

## Ce qui reste à fournir par le client

Voir **[A-CONFIRMER.md](./A-CONFIRMER.md)**.
