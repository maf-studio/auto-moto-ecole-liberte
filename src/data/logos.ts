import ecoleConduiteQualite from '../assets/logos/ecole-conduite-qualite.png'
import monCompteFormation from '../assets/logos/mon-compte-formation.png'
import permisUnEuro from '../assets/logos/permis-un-euro.png'
import qualiopi from '../assets/logos/qualiopi.png'
import securiteRoutiere from '../assets/logos/securite-routiere.png'
import troisFois from '../assets/logos/trois-fois-sans-frais.png'
import type { Financement } from './financements.ts'

/**
 * Les logos du flyer de l’établissement (positifdesign, reçu le 19 octobre
 * 2026), découpés dans l’image du flyer : à remplacer par les fichiers
 * d’origine (même nom, dans `src/assets/logos/`) dès que le graphiste les
 * fournit, pour un rendu plus net.
 *
 * `largeur` : la largeur d’affichage en pixels CSS, environ 60 % de la largeur
 * du fichier, pour rester net sur les écrans haute densité.
 *
 * Retirés, et à NE PAS ajouter tant que l’aide ne rouvre pas (voir
 * `financements.ts`) : « France Travail, aide de 1200 € » (aide supprimée le
 * 1er avril 2026) et « LABAZ, 1000 € pour ton permis » (aide fermée depuis le
 * 22 mai 2026).
 */
export interface Logo {
  src: ImageMetadata
  alt: string
  largeur: number
}

/** Labels et marques de la démarche qualité. */
export const LOGOS_LABELS: ReadonlyArray<Logo & { nom: string; mention: string | null }> = [
  {
    nom: 'École conduite qualité',
    src: ecoleConduiteQualite,
    alt: 'Label École conduite qualité, enseignement labellisé par la Sécurité routière',
    largeur: 80,
    mention: null,
  },
  {
    nom: 'Qualiopi',
    src: qualiopi,
    alt: 'Qualiopi, processus certifié, République française',
    largeur: 150,
    /* Mention exigée par la charte d’usage de la marque Qualiopi. */
    mention: 'La certification qualité a été délivrée au titre de la catégorie d’action suivante : actions de formation.',
  },
  {
    nom: 'Sécurité routière',
    src: securiteRoutiere,
    alt: 'Sécurité routière, vivre ensemble',
    largeur: 158,
    mention: null,
  },
]

/** Le logo de chaque solution de financement qui en a un sur le flyer. */
export const LOGOS_FINANCEMENTS: Partial<Record<Financement['id'], Logo>> = {
  cpf: { src: monCompteFormation, alt: 'Mon Compte Formation : cette offre de formation est éligible', largeur: 92 },
  'paiement-3-fois': { src: troisFois, alt: 'Paiement en 3 fois sans frais', largeur: 96 },
  'permis-1-euro': { src: permisUnEuro, alt: 'Le permis à un euro par jour', largeur: 104 },
}
