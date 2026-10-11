/**
 * Avis Google cités sur le site : uniquement des avis réels, recopiés de la
 * fiche Google de l’établissement (transmis le 11 octobre 2026), avec la note
 * donnée par leur auteur. Le nom est abrégé (prénom et initiale).
 *
 * `extrait` : le texte affiché. Toute coupure est marquée « […] » ; aucun mot
 * n’est changé. Pour ajouter un avis : le recopier tel quel, sans le corriger.
 * Avant mise en ligne, il est recommandé d’obtenir l’accord de chaque auteur.
 */
export interface Avis {
  auteur: string
  note: 1 | 2 | 3 | 4 | 5
  source: 'Google'
  extrait: string
}

export const AVIS: readonly Avis[] = [
  {
    auteur: 'Thierry D.',
    note: 5,
    source: 'Google',
    extrait:
      'Très bonne auto-école, l’accompagnement des moniteurs est au top et ils sont à l’écoute des élèves et prennent en compte les difficultés qu’on peut avoir en faisant preuve de pédagogie. Rapide pour décrocher une date d’examen. Un grand merci à eux et je conseille fortement cette auto-école.',
  },
  {
    auteur: 'Narimene S.',
    note: 5,
    source: 'Google',
    extrait:
      'Excellente expérience dans cette autoécole ! Les moniteurs sont vraiment au top : pédagogues, patients et toujours là pour mettre en confiance. […] L’organisation est sérieuse et l’accompagnement de Samy est vraiment de qualité : il est disponible, à l’écoute, arrangeant pour les heures de conduite et surtout très bienveillant.',
  },
  {
    auteur: 'Rayan G.',
    note: 5,
    source: 'Google',
    extrait:
      'Je recommande vivement cette école ! […] Le personnel est très pro […] Je n’ai pas senti le temps passer tellement je prenais du plaisir à apprendre. Merci beaucoup !',
  },
]
