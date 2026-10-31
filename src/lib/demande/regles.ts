/**
 * Les règles de saisie, sans aucune dépendance : importées à la fois par le
 * serveur (`schema.ts`) et par le script du navigateur, qui reste léger.
 */
export const TELEPHONE = /^(?:(?:\+|00)33[\s.-]?|0)[1-9](?:[\s.-]?\d{2}){4}$/
export const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
export const MESSAGE_MAX = 2000
/** L’âge accepté : de 14 ans (on se renseigne avant la conduite accompagnée, dès 15 ans) à 99 ans. */
export const AGE_MIN = 14
export const AGE_MAX = 99

export const MESSAGES = {
  nom: 'Indiquez votre nom.',
  prenom: 'Indiquez votre prénom.',
  ageVide: 'Indiquez votre âge.',
  age: `Indiquez un âge en années, entre ${AGE_MIN} et ${AGE_MAX} ans.`,
  telephoneVide: 'Indiquez un numéro de téléphone pour que nous puissions vous rappeler.',
  telephone: 'Ce numéro ne semble pas valide. Exemple : 06 12 34 56 78.',
  emailVide: 'Indiquez votre adresse e-mail.',
  email: 'Cette adresse e-mail ne semble pas valide. Exemple : nom@exemple.fr.',
  formation: 'Choisissez le permis qui vous intéresse.',
  experience: 'Choisissez une réponse dans la liste, ou laissez vide.',
  disponibilites: 'Choisissez vos disponibilités dans la liste.',
  financement: 'Choisissez une solution dans la liste, ou laissez vide.',
  message: `Vos questions dépassent ${MESSAGE_MAX} caractères.`,
  consentement: 'Cochez cette case pour que nous puissions traiter votre demande.',
} as const

/** L’âge saisi, en nombre entier, ou `null` s’il n’en est pas un. */
export function lireAge(valeur: string): number | null {
  if (!/^\d{1,3}$/.test(valeur.trim())) return null
  const age = Number(valeur)
  return age >= AGE_MIN && age <= AGE_MAX ? age : null
}
