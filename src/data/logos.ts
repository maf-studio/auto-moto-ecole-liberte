import ecoleConduiteQualite from '../assets/logos/ecole-conduite-qualite.png'
import monCompteFormation from '../assets/logos/mon-compte-formation.png'
import monCompteFormationSurNuit from '../assets/logos/mon-compte-formation-sur-nuit.png'
import permisUnEuro from '../assets/logos/permis-un-euro.png'
import qualiopi from '../assets/logos/qualiopi.png'
import qualiopiSurNuit from '../assets/logos/qualiopi-sur-nuit.png'
import securiteRoutiere from '../assets/logos/securite-routiere.png'
import securiteRoutiereSurNuit from '../assets/logos/securite-routiere-sur-nuit.png'
import troisFois from '../assets/logos/trois-fois-sans-frais.png'
import type { Financement } from './financements.ts'

/**
 * Les logos du flyer de l’établissement (positifdesign, reçu le 19 octobre
 * 2026), en haute définition : fichiers fournis le 19 octobre 2026, détourés
 * (sans fond) ; le « 3X Sans Frais » est redessiné d’après le flyer. Pour en
 * changer un, remplacer le fichier du même nom dans `src/assets/logos/`.
 *
 * `largeur` : la largeur d’affichage en pixels CSS ; chaque fichier fait au
 * moins le double, pour rester net sur les écrans haute densité.
 * `srcSurNuit` : la version pour fond sombre (pied de page, cartes de
 * l’accueil), quand le logo a du texte foncé : ce texte y passe en blanc.
 *
 * Retirés, et à NE PAS ajouter tant que l’aide ne rouvre pas (voir
 * `financements.ts`) : « France Travail, aide de 1200 € » (aide supprimée le
 * 1er avril 2026) et « LABAZ, 1000 € pour ton permis » (aide fermée depuis le
 * 22 mai 2026).
 */
export interface Logo {
  src: ImageMetadata
  /** La version pour fond sombre, quand le logo a du texte foncé. */
  srcSurNuit?: ImageMetadata
  alt: string
  largeur: number
}

/** Labels et marques de la démarche qualité. */
export const LOGOS_LABELS: ReadonlyArray<Logo & { nom: string; mention: string | null }> = [
  {
    nom: 'École conduite qualité',
    src: ecoleConduiteQualite,
    alt: 'Label École conduite qualité, enseignement labellisé par la Sécurité routière',
    largeur: 96,
    mention: null,
  },
  {
    nom: 'Qualiopi',
    src: qualiopi,
    srcSurNuit: qualiopiSurNuit,
    alt: 'Qualiopi, processus certifié, République française',
    largeur: 150,
    /* Mention exigée par la charte d’usage de la marque Qualiopi. */
    mention: 'La certification qualité a été délivrée au titre de la catégorie d’action suivante : actions de formation.',
  },
  {
    nom: 'Sécurité routière',
    src: securiteRoutiere,
    srcSurNuit: securiteRoutiereSurNuit,
    alt: 'Sécurité routière, vivre ensemble',
    largeur: 158,
    mention: null,
  },
]

/** Le logo de chaque solution de financement qui en a un sur le flyer. */
export const LOGOS_FINANCEMENTS: Partial<Record<Financement['id'], Logo>> = {
  cpf: {
    src: monCompteFormation,
    srcSurNuit: monCompteFormationSurNuit,
    alt: 'Mon Compte Formation : cette offre de formation est éligible',
    largeur: 96,
  },
  'paiement-3-fois': { src: troisFois, alt: 'Paiement en 3 fois sans frais', largeur: 108 },
  'permis-1-euro': {
    src: permisUnEuro,
    alt: 'Le permis à un euro par jour, établissement partenaire de la Sécurité routière',
    largeur: 112,
  },
}
