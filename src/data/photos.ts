import voiture from '../assets/photos/voiture.webp'
import voitureAvant from '../assets/photos/voiture-avant.webp'
import moto from '../assets/photos/moto.webp'

/**
 * Les images de l’établissement associées aux formations (haut de page et
 * cartes). Une formation absente d’ici reçoit un visuel dessiné aux couleurs
 * de la marque. Pour ajouter une vraie photo : la déposer dans
 * `src/assets/photos/`, l’importer ici, et l’associer au bon identifiant.
 */
export const PHOTOS_FORMATIONS: Record<string, { src: ImageMetadata; alt: string } | undefined> = {
  'permis-b': {
    src: voiture,
    alt: 'La voiture-école blanche aux couleurs de Liberté, panneau « Auto-école » sur le toit',
  },
  'permis-automatique': {
    src: voitureAvant,
    alt: 'L’avant de la voiture-école aux couleurs de Liberté',
  },
  'permis-a1': { src: moto, alt: 'La moto-école de Liberté' },
  'permis-a2': { src: moto, alt: 'La moto-école de Liberté' },
  'passerelle-a2-a': { src: moto, alt: 'La moto-école de Liberté' },
}
