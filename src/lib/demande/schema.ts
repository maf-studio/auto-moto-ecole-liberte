import { FORMATIONS_PUBLIEES } from '../../data/formations.ts'
import { FINANCEMENTS } from '../../data/financements.ts'
import { EMAIL, MESSAGES, MESSAGE_MAX, TELEPHONE, lireAge } from './regles.ts'

/**
 * Les règles du formulaire de demande de devis, partagées par le navigateur
 * (messages immédiats) et par le serveur (qui ne fait jamais confiance au
 * navigateur). Un seul formulaire pour tout le site : contact, devis,
 * financement. Les champs sont ceux demandés par l’établissement (retour du
 * 31 octobre 2026) : nom, prénom, âge, ville, téléphone, e-mail, permis
 * souhaité, expérience de conduite, disponibilités, questions complémentaires.
 */

export const AUTRE_FORMATION = 'autre'
export const FINANCEMENT_INCONNU = 'je-ne-sais-pas'

export const OPTIONS_FORMATION = [
  ...FORMATIONS_PUBLIEES.map((f) => ({ valeur: f.slug, libelle: f.nom, groupe: f.categorie })),
  { valeur: AUTRE_FORMATION, libelle: 'Autre, ou je ne sais pas encore', groupe: 'autre' as const },
]

export const OPTIONS_FINANCEMENT = [
  ...FINANCEMENTS.map((f) => ({ valeur: f.id, libelle: f.titre })),
  { valeur: FINANCEMENT_INCONNU, libelle: 'Je ne sais pas encore' },
]

export const OPTIONS_EXPERIENCE = [
  { valeur: 'debutant', libelle: 'Je n’ai jamais conduit' },
  { valeur: 'lecons', libelle: 'J’ai déjà pris des leçons de conduite' },
  { valeur: 'accompagnee', libelle: 'Je conduis en conduite accompagnée ou supervisée' },
  { valeur: 'autre-permis', libelle: 'J’ai déjà un permis (autre catégorie ou permis étranger)' },
  { valeur: 'reprise', libelle: 'Je reprends après une pause ou une annulation de permis' },
] as const

/** Les jours et moments proposés : ceux des leçons de conduite (lundi au samedi, 7 h à 20 h). */
export const OPTIONS_JOURS = [
  { valeur: 'lundi', libelle: 'Lundi' },
  { valeur: 'mardi', libelle: 'Mardi' },
  { valeur: 'mercredi', libelle: 'Mercredi' },
  { valeur: 'jeudi', libelle: 'Jeudi' },
  { valeur: 'vendredi', libelle: 'Vendredi' },
  { valeur: 'samedi', libelle: 'Samedi' },
] as const

export const OPTIONS_MOMENTS = [
  { valeur: 'matin', libelle: 'Matin' },
  { valeur: 'midi', libelle: 'Midi' },
  { valeur: 'apres-midi', libelle: 'Après-midi' },
  { valeur: 'soir', libelle: 'En soirée' },
] as const

export const LIMITES = { nom: 80, prenom: 80, ville: 80, telephone: 25, email: 160, message: MESSAGE_MAX } as const

export interface Demande {
  nom: string
  prenom: string
  age: number
  ville: string | null
  telephone: string
  email: string
  formation: string
  experience: string | null
  jours: string[]
  moments: string[]
  financement: string | null
  message: string | null
  depuis: string | null
}

export type Champ =
  | 'nom'
  | 'prenom'
  | 'age'
  | 'ville'
  | 'telephone'
  | 'email'
  | 'formation'
  | 'experience'
  | 'jours'
  | 'moments'
  | 'financement'
  | 'message'
  | 'consentement'
export type Erreurs = Partial<Record<Champ, string>>

/** Les champs reçus : une chaîne, ou une liste pour les cases à cocher multiples. */
export type Brut = Record<string, string | string[] | undefined>

const nettoyer = (v: unknown, max: number) =>
  typeof v === 'string' ? v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim().slice(0, max) : ''

const liste = (v: unknown): string[] => (Array.isArray(v) ? v : typeof v === 'string' && v ? [v] : []).map((x) => nettoyer(x, 30))

export function libelleFormation(valeur: string): string {
  return OPTIONS_FORMATION.find((o) => o.valeur === valeur)?.libelle ?? 'Non précisée'
}

export function libelleFinancement(valeur: string | null): string | null {
  if (!valeur) return null
  return OPTIONS_FINANCEMENT.find((o) => o.valeur === valeur)?.libelle ?? null
}

export function libelleExperience(valeur: string | null): string | null {
  if (!valeur) return null
  return OPTIONS_EXPERIENCE.find((o) => o.valeur === valeur)?.libelle ?? null
}

/** Des cases cochées en liste lisible (« Lundi, Mercredi »), ou `null` si aucune. */
export function libellesCoches(
  valeurs: string[],
  options: ReadonlyArray<{ valeur: string; libelle: string }>,
): string | null {
  const l = options.filter((o) => valeurs.includes(o.valeur)).map((o) => o.libelle)
  return l.length > 0 ? l.join(', ') : null
}

/** Valide les champs reçus ; renvoie la demande propre ou les erreurs, champ par champ. */
export function valider(brut: Brut): { ok: true; demande: Demande } | { ok: false; erreurs: Erreurs } {
  const erreurs: Erreurs = {}
  const nom = nettoyer(brut.nom, LIMITES.nom)
  const prenom = nettoyer(brut.prenom, LIMITES.prenom)
  const ageSaisi = nettoyer(brut.age, 5)
  const age = lireAge(ageSaisi)
  const ville = nettoyer(brut.ville, LIMITES.ville)
  const telephone = nettoyer(brut.telephone, LIMITES.telephone)
  const email = nettoyer(brut.email, LIMITES.email).toLowerCase()
  const formation = nettoyer(brut.formation, 60)
  const experience = nettoyer(brut.experience, 30)
  const jours = liste(brut.jours)
  const moments = liste(brut.moments)
  const financement = nettoyer(brut.financement, 60)
  const message = nettoyer(brut.message, LIMITES.message + 1)
  const depuis = nettoyer(brut.depuis, 200)

  if (!nom) erreurs.nom = MESSAGES.nom
  if (!prenom) erreurs.prenom = MESSAGES.prenom
  if (!ageSaisi) erreurs.age = MESSAGES.ageVide
  else if (age === null) erreurs.age = MESSAGES.age
  if (!telephone) erreurs.telephone = MESSAGES.telephoneVide
  else if (!TELEPHONE.test(telephone)) erreurs.telephone = MESSAGES.telephone
  if (!email) erreurs.email = MESSAGES.emailVide
  else if (!EMAIL.test(email)) erreurs.email = MESSAGES.email
  if (!OPTIONS_FORMATION.some((o) => o.valeur === formation)) erreurs.formation = MESSAGES.formation
  if (experience && !OPTIONS_EXPERIENCE.some((o) => o.valeur === experience)) erreurs.experience = MESSAGES.experience
  if (jours.some((j) => !OPTIONS_JOURS.some((o) => o.valeur === j))) erreurs.jours = MESSAGES.disponibilites
  if (moments.some((m) => !OPTIONS_MOMENTS.some((o) => o.valeur === m))) erreurs.moments = MESSAGES.disponibilites
  if (financement && !OPTIONS_FINANCEMENT.some((o) => o.valeur === financement)) erreurs.financement = MESSAGES.financement
  if (message.length > LIMITES.message) erreurs.message = MESSAGES.message
  if (brut.consentement !== 'oui') erreurs.consentement = MESSAGES.consentement

  if (Object.keys(erreurs).length > 0 || age === null) return { ok: false, erreurs }
  return {
    ok: true,
    demande: {
      nom,
      prenom,
      age,
      ville: ville || null,
      telephone,
      email,
      formation,
      experience: experience || null,
      jours,
      moments,
      financement: financement || null,
      message: message || null,
      depuis: depuis.startsWith('/') ? depuis : null,
    },
  }
}
