import { getSecret } from 'astro:env/server'

/**
 * La configuration du service d’envoi, lue à l’appel (jamais figée dans le
 * code construit). Tout ou rien : s’il manque une pièce, les formulaires ne
 * sont pas proposés et laissent place aux moyens de contact directs. Aucun
 * envoi n’est jamais simulé.
 *
 *   EMAIL_PROVIDER   resend | brevo   (essai : tests locaux, rien n’est envoyé)
 *   RESEND_API_KEY / BREVO_API_KEY
 *   CONTACT_TO       l’adresse qui reçoit les demandes (ae.liberte@gmail.com)
 *   CONTACT_FROM     l’adresse d’expédition, sur un domaine vérifié chez le fournisseur
 *   FORM_SECRET      32 caractères au moins (openssl rand -hex 32)
 *
 * Les pages sont statiques : elles lisent cet état AU BUILD. Après l’ajout
 * des variables dans Vercel, redéployer pour que les formulaires apparaissent.
 */
export type Fournisseur = 'resend' | 'brevo' | 'essai'

export interface ConfigurationEnvoi {
  fournisseur: Fournisseur
  cle: string | null
  destinataire: string
  expediteur: string
  secret: string
}

export const LONGUEUR_MINIMALE_SECRET = 32

const lire = (cle: string): string | null => {
  const valeur = getSecret(cle)
  return typeof valeur === 'string' && valeur.trim() !== '' ? valeur.trim() : null
}

export function configurationEnvoi(): ConfigurationEnvoi | null {
  const lu = lire('EMAIL_PROVIDER')
  const fournisseur: Fournisseur | null =
    lu === 'resend' || lu === 'brevo' ? lu : lu === 'essai' && import.meta.env.DEV ? 'essai' : null
  if (!fournisseur) return null

  const secret = lire('FORM_SECRET')
  const destinataire = lire('CONTACT_TO')
  const expediteur = lire('CONTACT_FROM')
  const cle = fournisseur === 'resend' ? lire('RESEND_API_KEY') : fournisseur === 'brevo' ? lire('BREVO_API_KEY') : null
  if (!secret || secret.length < LONGUEUR_MINIMALE_SECRET || !destinataire || !expediteur) return null
  if (fournisseur !== 'essai' && !cle) return null
  return { fournisseur, cle, destinataire, expediteur, secret }
}

export const serviceEnvoiConfigure = () => configurationEnvoi() !== null
