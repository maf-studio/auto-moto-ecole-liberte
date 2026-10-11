/**
 * ============================================================================
 * L’ÉTABLISSEMENT : la seule source des coordonnées, horaires, avis, labels…
 * ============================================================================
 *
 * Règle du site : RIEN D’INVENTÉ. Une information inconnue vaut `null`, et ce
 * qui en dépend disparaît du site (pas de valeur d’exemple, pas de tiret).
 * `pnpm check:publication` liste tout ce qui reste à compléter ou à confirmer.
 *
 * Guide de modification en français simple : MODIFIER-LE-CONTENU.md
 */

export const ETABLISSEMENT = {
  nom: 'Auto-Moto École Liberté',
  nomCourt: 'Auto-École Liberté',
  /** Écrit dans les titres de page (balise <title>) après le nom de la page. */
  nomTitre: 'Auto-Moto École Liberté, Les Lilas',
  anneeCreation: 2010,
  agrement: 'E 24 093 00370',

  adresse: {
    rue: '44 boulevard de la Liberté',
    codePostal: '93260',
    ville: 'Les Lilas',
    pays: 'FR',
  },

  telephone: {
    affiche: '01 49 88 90 71',
    lien: 'tel:+33149889071',
    international: '+33 1 49 88 90 71',
  },

  email: 'ae.liberte@gmail.com',

  /**
   * WhatsApp : `null` tant qu’aucun numéro n’est fourni avec l’accord de
   * l’établissement. Renseigné (ex. '33612345678', sans + ni espace), un
   * bouton WhatsApp apparaît sur la page Contact.
   */
  whatsapp: null as string | null,

  /**
   * Coordonnées GPS : `null` tant qu’elles n’ont pas été relevées sur place ou
   * dans la Base Adresse Nationale (adresse.data.gouv.fr). Les données
   * structurées ne les publient que si elles sont renseignées.
   */
  geo: null as { latitude: number; longitude: number } | null,

  /** Lien vers la fiche Google de l’établissement. */
  google: {
    /**
     * Recherche Google Maps sur le nom et l’adresse : elle ouvre la fiche.
     * À remplacer par le lien exact de la fiche (« Partager » dans Google Maps).
     */
    fiche:
      'https://www.google.com/maps/search/?api=1&query=Auto%2FMoto%20Ecole%20Libert%C3%A9%2C%2044%20Bd%20de%20la%20Libert%C3%A9%2C%2093260%20Les%20Lilas',
    itineraire:
      'https://www.google.com/maps/dir/?api=1&destination=Auto%2FMoto%20Ecole%20Libert%C3%A9%2C%2044%20Bd%20de%20la%20Libert%C3%A9%2C%2093260%20Les%20Lilas',
    /** Carte intégrée, chargée seulement après accord du visiteur. */
    carte:
      'https://www.google.com/maps?q=Auto%2FMoto%20Ecole%20Libert%C3%A9%2C%2044%20Bd%20de%20la%20Libert%C3%A9%2C%2093260%20Les%20Lilas&output=embed',
  },

  /**
   * La note Google, relevée à la main (captures fournies le 11 octobre 2026).
   * Elle s’affiche toujours avec sa date de relevé. Mettez les trois valeurs à
   * jour ensemble, ou passez `note` à `null` pour la retirer partout.
   *
   * Elle n’est PAS publiée en données structurées : Google n’accepte pas les
   * avis qu’un établissement publie sur lui-même.
   */
  noteGoogle: {
    note: 4.8,
    nombreAvis: 257,
    releveLe: '2026-10-11',
  } as { note: number; nombreAvis: number; releveLe: string } | null,

  /** Horaires du bureau (accueil, inscriptions). Jour : 1 = lundi … 7 = dimanche. */
  horairesBureau: [
    { jours: [1, 2, 3, 4, 5], plages: [['10:00', '12:00'], ['15:00', '20:00']] },
    { jours: [6], plages: [['10:00', '12:00']] },
  ] as Horaires,

  /** Créneaux des leçons de conduite (distincts de l’accueil). */
  horairesConduite: [{ jours: [1, 2, 3, 4, 5, 6], plages: [['07:00', '20:00']] }] as Horaires,

  /**
   * Réseaux sociaux : le dépliant annonce « Suivez-nous ! @ame.liberte » avec
   * des codes Snapchat et Instagram (un troisième code n’est pas identifié).
   * Les adresses ci-dessous en sont déduites : à confirmer avec l’établissement.
   * `null` retire le lien du site.
   */
  identifiantReseaux: '@ame.liberte' as string | null,
  reseaux: [
    { nom: 'Instagram', url: 'https://www.instagram.com/ame.liberte/' },
    { nom: 'Snapchat', url: 'https://www.snapchat.com/add/ame.liberte' },
  ] as ReadonlyArray<{ nom: 'Instagram' | 'Snapchat' | 'Facebook' | 'TikTok'; url: string }>,

  /**
   * L’équipe : vide tant que les présentations (prénom, rôle, photo) et
   * l’accord de chacun ne sont pas fournis. La section « L’équipe » de la page
   * À propos n’apparaît qu’avec au moins une personne.
   */
  equipe: [] as ReadonlyArray<{ prenom: string; role: string; photo: ImageMetadata | null }>,

  /**
   * Le fichier source du logo (SVG de préférence), à demander à l’agence qui a
   * créé le dépliant (Positif.biz). En attendant, `null` : le site affiche une
   * reconstitution du logo du dépliant en SVG (composant `ui/Logo.astro`).
   * Pour poser le vrai : déposer le fichier dans `src/assets/marque/`, puis
   * l’importer ici (MODIFIER-LE-CONTENU.md).
   */
  logoFichier: null as ImageMetadata | null,

  /**
   * Labels et certifications, tels qu’annoncés sur le dépliant de
   * l’établissement. Affichés en texte (pas de logo officiel sans le fichier
   * et la charte d’usage). Qualiopi : vérifier la catégorie d’action certifiée
   * (« actions de formation »), mention que sa charte demande d’écrire.
   */
  labels: [
    {
      nom: 'Qualiopi',
      detail: 'Processus certifié, au titre des actions de formation.',
      lien: null,
    },
    {
      nom: 'École conduite qualité',
      detail: 'Le label qualité de l’État pour les écoles de conduite.',
      lien: null,
    },
  ] as ReadonlyArray<{ nom: string; detail: string; lien: string | null }>,

  /**
   * Le paiement en plusieurs fois, annoncé sur la vitrine (« 3X sans frais »).
   * `conditions` : `null` tant que les modalités exactes ne sont pas
   * communiquées (le site renvoie alors vers l’accueil pour les connaître).
   */
  paiementPlusieursFois: {
    libelle: 'Paiement en 3 fois sans frais',
    conditions: null as string | null,
  },

  /**
   * Mentions légales : à compléter avec les informations réelles. Tant qu’une
   * valeur obligatoire vaut `null`, la page l’indique « à compléter » et
   * `pnpm check:publication` refuse la mise en ligne.
   */
  legal: {
    raisonSociale: null as string | null,
    formeJuridique: null as string | null,
    capital: null as string | null,
    siren: null as string | null,
    siret: null as string | null,
    rcs: null as string | null,
    tva: null as string | null,
    directeurPublication: null as string | null,
    /** Hébergeur du site, si le site est mis en ligne sur Vercel. */
    hebergeur: {
      nom: 'Vercel Inc.',
      adresse: '440 N Barranca Ave #4133, Covina, CA 91723, États-Unis',
      site: 'https://vercel.com',
    },
    /** Conception et réalisation du site. */
    realisation: { nom: 'MAF Studio', site: 'https://www.maf-studio.fr' } as { nom: string; site: string } | null,
    /** Médiateur de la consommation (obligatoire pour un professionnel qui vend à des particuliers). */
    mediateur: null as { nom: string; site: string } | null,
  },
} as const

export type Plage = readonly [string, string]
export type Horaires = ReadonlyArray<{ jours: readonly number[]; plages: readonly Plage[] }>
