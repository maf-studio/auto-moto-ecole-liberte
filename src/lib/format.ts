/** 4.8 → « 4,8 » */
export const noteFr = (n: number) => n.toLocaleString('fr-FR', { maximumFractionDigits: 1 })

/** 1090 → « 1 090 € » (TTC : l’établissement facture des particuliers). */
export const euros = (n: number) =>
  `${n.toLocaleString('fr-FR', { maximumFractionDigits: 0 }).replace(/[\u202f\u00a0]/g, '\u00a0')}\u00a0€`

/** « 2026-10-11 » → « en octobre 2026 » */
export function dateRelevee(iso: string): string {
  const date = new Date(`${iso}T12:00:00`)
  return `en ${date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}`
}

/** « 2026-10-11 » → « 11 octobre 2026 » */
export function dateLongue(iso: string): string {
  return new Date(`${iso}T12:00:00`).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

/** Un numéro WhatsApp international (« 33612345678 ») écrit à la française : « 06 12 34 56 78 ». */
export function telephoneFr(international: string): string {
  const national = international.startsWith('33') ? `0${international.slice(2)}` : international
  return national.replace(/(\d{2})(?=\d)/g, '$1 ')
}
