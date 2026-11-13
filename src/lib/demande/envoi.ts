import type { ConfigurationEnvoi } from './configuration.ts'
import {
  OPTIONS_JOURS,
  OPTIONS_MOMENTS,
  libelleExperience,
  libelleFinancement,
  libelleFormation,
  libellesCoches,
  type Demande,
} from './schema.ts'

/**
 * L’envoi de la demande à l’établissement, par Resend ou Brevo (un POST avec
 * une clé). Un seul e-mail : la notification, avec « Répondre à » sur
 * l’adresse du demandeur. Aucun accusé automatique n’est envoyé à l’adresse
 * saisie : le formulaire ne doit pas pouvoir servir à écrire à un tiers.
 */
/**
 * L’explication donnée par le fournisseur quand il refuse un envoi (domaine
 * non vérifié, clé invalide, adresse d’expédition mal écrite…), pour le
 * journal du serveur (Vercel : Logs). Jamais montrée au visiteur.
 */
async function explication(reponse: Response): Promise<string> {
  const texte = await reponse.text().catch(() => '')
  try {
    const corps = JSON.parse(texte) as { message?: unknown; name?: unknown; code?: unknown }
    const message = [corps.name ?? corps.code, corps.message].filter((v) => typeof v === 'string').join(' : ')
    if (message) return message.slice(0, 300)
  } catch {
    /* Réponse qui n’est pas du JSON : on garde le texte brut. */
  }
  return texte.slice(0, 300) || 'sans explication'
}

const surUneLigne = (t: string) => t.replace(/[\p{Cc}\u2028\u2029]+/gu, ' ').trim()

function corps(d: Demande): string {
  return [
    'Nouvelle demande de devis envoyée depuis le site internet.',
    '',
    `Nom            ${d.nom}`,
    `Prénom         ${d.prenom}`,
    `Âge            ${d.age} ans`,
    `Ville          ${d.ville ?? 'Non précisée'}`,
    `Téléphone      ${d.telephone}`,
    `E-mail         ${d.email}`,
    '',
    `Permis         ${libelleFormation(d.formation)}`,
    `Expérience     ${libelleExperience(d.experience) ?? 'Non précisée'}`,
    `Jours          ${libellesCoches(d.jours, OPTIONS_JOURS) ?? 'Non précisés'}`,
    `Moments        ${libellesCoches(d.moments, OPTIONS_MOMENTS) ?? 'Non précisés'}`,
    `Financement    ${libelleFinancement(d.financement) ?? 'Non précisé'}`,
    d.depuis ? `Page           ${d.depuis}` : null,
    '',
    'Questions complémentaires',
    '─────────────────────────',
    d.message ?? '(aucune)',
    '',
    'Pour répondre : utilisez « Répondre », ou rappelez le numéro indiqué.',
  ]
    .filter((l) => l !== null)
    .join('\n')
}

export async function envoyerDemande(c: ConfigurationEnvoi, d: Demande): Promise<void> {
  const objet = surUneLigne(`Demande de devis : ${libelleFormation(d.formation)} — ${d.prenom} ${d.nom}`)
  const texte = corps(d)

  if (c.fournisseur === 'essai') {
    if (!import.meta.env.DEV) throw new Error('fournisseur d’essai refusé en production')
    console.info(`[essai] demande non envoyée (développement) :\n${objet}\n${texte}`)
    return
  }

  if (c.fournisseur === 'resend') {
    const reponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${c.cle}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: c.expediteur, to: [c.destinataire], subject: objet, text: texte, reply_to: d.email }),
    })
    if (!reponse.ok) throw new Error(`Resend a répondu ${reponse.status} (${await explication(reponse)})`)
    return
  }

  const reponse = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: { 'api-key': c.cle ?? '', 'Content-Type': 'application/json', accept: 'application/json' },
    body: JSON.stringify({
      sender: { email: c.expediteur, name: 'Site Auto-Moto École Liberté' },
      to: [{ email: c.destinataire }],
      replyTo: { email: d.email, name: surUneLigne(`${d.prenom} ${d.nom}`) },
      subject: objet,
      textContent: texte,
    }),
  })
  if (!reponse.ok) throw new Error(`Brevo a répondu ${reponse.status} (${await explication(reponse)})`)
}
