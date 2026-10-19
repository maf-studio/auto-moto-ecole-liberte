# Modifier le contenu du site

Tout ce qui s’affiche sur le site vient de quelques fichiers du dossier `src/data/`. On n’a jamais besoin de
toucher aux pages elles-mêmes pour changer un horaire, un prix ou une formation. Après chaque modification :
`pnpm build`, puis mise en ligne (un « push » suffit si le projet est relié à Vercel).

Règle d’or : **ne jamais inventer**. Une information inconnue s’écrit `null` ; ce qui en dépend disparaît du site.

## Coordonnées, horaires, note Google : `src/data/etablissement.ts`

- **Téléphone, e-mail, adresse** : `telephone`, `email`, `adresse`.
- **Horaires** : `horairesBureau` (accueil) et `horairesConduite` (leçons). Les jours sont des numéros :
  1 = lundi … 7 = dimanche. Exemple : `{ jours: [1, 2, 3, 4, 5], plages: [['10:00', '12:00'], ['15:00', '20:00']] }`.
  Un jour absent s’affiche « Fermé ».
- **Note Google** : `noteGoogle` (note, nombre d’avis, date du relevé au format `AAAA-MM-JJ`). Mettre les trois à
  jour ensemble. `null` la retire partout.
- **Réseaux sociaux** : `reseaux` (Instagram, Snapchat, Facebook ou TikTok, avec l’adresse complète).
- **WhatsApp** : `whatsapp`, le numéro au format international sans « + » ni espace (`33612345678`).
- **Labels** : `labels` (nom et détail). Une liste vide retire la section.
- **Paiement en plusieurs fois** : `paiementPlusieursFois.conditions`, une phrase sur les modalités exactes.
- **Équipe** : `equipe` (prénom, rôle, photo). La section apparaît dès qu’une personne est ajoutée, avec son accord.
- **Garantie financière** : `garantieFinanciere` (`{ garant: 'Nom du garant' }`). Elle s’affiche sur la page
  Démarche qualité.
- **Mentions légales** : `legal` (raison sociale, SIRET, directeur de la publication, médiateur…).

## Le logo

Le logo officiel, en vectoriel, est dans `src/assets/marque/` : `logo-liberte-sombre.svg` (fonds sombres) et
`logo-liberte-clair.svg` (fonds clairs), tirés du fichier du graphiste. Pour le changer, remplacer ces deux
fichiers en gardant leur nom.

## Les logos des labels et des financements : `src/data/logos.ts`

Les fichiers sont dans `src/assets/logos/`, sans fond. Pour changer un logo, déposer le nouveau fichier sous le même
nom ; le fichier `…-sur-nuit.png` est sa version pour fond sombre (texte en blanc). `largeur` règle sa taille à
l’écran. Un financement fermé ou supprimé (France Travail, LABAZ) n’a pas de logo.

## Les formations et les prix : `src/data/formations.ts`

Une entrée = une page. Pour chaque formation : nom, textes, prérequis, déroulement, programme, durée, FAQ,
financements possibles, sources.

- **Publier ou masquer une formation** : `statut: 'publiee'` ou `statut: 'brouillon'`. Un brouillon n’apparaît ni
  dans les menus, ni dans le plan, ni dans Google.
- **Les formules et les prix** : dans `formules`, comme sur le flyer : `titre`, `boite` (l’étiquette noire),
  `contenu` (ce que comprend le forfait, ligne par ligne) et `prix` (une barre par volume : `volume`, `prixTTC` en
  euros sans espace, `verifie: true`). Sans prix, ou avec `verifie: false`, le site écrit « Sur demande ». Les
  formules permis B et moto, communes à plusieurs pages, sont écrites une seule fois en haut du fichier.
- **La page Tarifs** : l’ordre des groupes, les autres formations, les prestations à la carte et la définition de
  la leçon sont dans `src/data/tarifs.ts`.
- **Ajouter une formation** : copier une entrée existante, changer le `slug` (l’adresse de la page) et les textes.
  Elle apparaît automatiquement dans les menus, le pied de page, les tarifs, le formulaire et le sitemap.

## Les photos : `src/data/photos.ts`

Les photos des locaux et des véhicules (plaques floutées) sont décrites dans `PHOTOS` : fichier, texte `alt` (ce
qu’on voit), et `position` (le point à garder visible quand la photo est recadrée). `PHOTOS_FORMATIONS` dit quelle
photo va en haut de quelle formation ; les cartes des formations gardent leur icône. Pour ajouter une photo : la
déposer dans `src/assets/photos/`, l’importer en haut du fichier et la décrire dans `PHOTOS`.

## Les financements : `src/data/financements.ts`

Conditions, pour qui, démarche, sources. Ces règles changent souvent (deux réformes en 2026) : relire au moins
une fois par an et mettre à jour `DERNIERE_VERIFICATION` dans `src/data/sources.ts`.

## Les documents d’inscription : `src/data/documents.ts`

Chaque pièce indique à quelles formations elle s’applique (`pour`). La liste à cocher et les pages formations se
mettent à jour seules.

## Les questions fréquentes : `src/data/faq.ts`

Questions de l’accueil et du financement. Les questions propres à une formation sont dans `formations.ts`.

## Les documents qualité : `src/data/qualite.ts`

Déposer le PDF dans `public/documents/`, puis écrire son adresse dans `fichier`
(`'/documents/reglement-interieur.pdf'`). Seuls les documents fournis apparaissent sur la page Démarche qualité.

## Les avis : `src/data/avis.ts`

Uniquement des avis réels, recopiés **sans changer un mot** (une coupure s’écrit « […] »), avec le prénom et
l’initiale du nom. Demander l’accord de l’auteur avant de le publier.
