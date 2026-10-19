import locauxAttente from '../assets/photos/locaux-attente.jpg'
import locauxBureau from '../assets/photos/locaux-bureau.jpg'
import moto from '../assets/photos/moto.jpg'
import voitureGrise from '../assets/photos/voiture-grise.jpg'
import voitureNoire from '../assets/photos/voiture-noire.jpg'

/**
 * Les photos de l’établissement (reçues le 19 octobre 2026), toutes au format
 * portrait. Les plaques d’immatriculation sont floutées.
 *
 * `position` : le point à garder visible quand la photo est recadrée
 * (object-position). `portrait` : la photo ne supporte pas un cadre en
 * paysage (la moto, plus haute que large).
 */
export interface Photo {
  src: ImageMetadata
  alt: string
  position: string
  portrait?: boolean
}

export const PHOTOS = {
  attente: {
    src: locauxAttente,
    alt: 'L’espace d’attente de l’auto-école : mur bleu, canapé et fauteuils en velours bleu canard, plantes, et la vitrine sur le boulevard',
    position: '50% 62%',
  },
  bureau: {
    src: locauxBureau,
    alt: 'Le bureau d’accueil de l’auto-école : comptoir en bois clair, deux chaises bleu canard, certificats au mur et casques de moto au fond',
    position: '50% 58%',
  },
  voitureNoire: {
    src: voitureNoire,
    alt: 'Une voiture-école noire de l’auto-école, panneau « Auto-école » sur le toit, garée dans la rue',
    position: '50% 66%',
  },
  voitureGrise: {
    src: voitureGrise,
    alt: 'Une voiture-école grise de l’auto-école, vue de l’arrière, garée dans la rue',
    position: '50% 58%',
  },
  moto: {
    src: moto,
    alt: 'La moto-école de l’auto-école, une moto noire garée sur le trottoir',
    position: '50% 62%',
    portrait: true,
  },
} satisfies Record<string, Photo>

/**
 * La photo en haut de la page d’une formation. Une formation absente d’ici
 * reçoit le visuel dessiné du flyer. Les cartes des formations montrent
 * toujours ce visuel dessiné (icônes). Aucune photo n’est attribuée à une
 * formation dont elle montrerait le mauvais véhicule (la moto n’illustre pas
 * le permis A1 ni la formation 125, faits sur des motos légères).
 */
export const PHOTOS_FORMATIONS: Record<string, Photo | undefined> = {
  'permis-b': PHOTOS.voitureNoire,
  'permis-automatique': PHOTOS.voitureGrise,
  'conduite-accompagnee': PHOTOS.voitureNoire,
  'permis-a2': PHOTOS.moto,
  'passerelle-a2-a': PHOTOS.moto,
}
