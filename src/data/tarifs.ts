/**
 * La page Tarifs, dans l’ordre du flyer de l’établissement (positifdesign,
 * reçu le 19 octobre 2026). Les formules et leurs prix vivent dans
 * `formations.ts` (une seule source) ; ce fichier dit seulement comment la
 * page les regroupe, et porte ce qui n’appartient à aucune formation : les
 * prestations à la carte et la définition de la leçon.
 */

export interface GroupeTarifs {
  titre: string
  /** Les formules affichées : formation (identifiant) et rang de la formule dans `formules`. */
  formules: ReadonlyArray<{ formation: string; rang: number }>
}

export const GROUPES_TARIFS: readonly GroupeTarifs[] = [
  {
    titre: 'Formules permis B',
    formules: [
      { formation: 'permis-b', rang: 0 },
      { formation: 'permis-automatique', rang: 0 },
      { formation: 'conduite-accompagnee', rang: 0 },
    ],
  },
  {
    titre: 'Formules permis moto',
    formules: [
      { formation: 'permis-a2', rang: 0 },
      { formation: 'permis-a2', rang: 1 },
    ],
  },
]

/** « Autres formations » du flyer : une ligne par formule, avec son prix. */
export const AUTRES_FORMATIONS: ReadonlyArray<{ formation: string | null; titre: string; detail: string; prixTTC: number; supplement?: boolean }> = [
  { formation: null, titre: 'Formation accélérée', detail: 'Votre forfait', prixTTC: 450, supplement: true },
  { formation: 'passerelle-boite-manuelle', titre: 'Passerelle BEA vers B', detail: '7 leçons', prixTTC: 435 },
  { formation: 'permis-am', titre: 'Formation AM', detail: '8 heures', prixTTC: 290 },
  { formation: 'formation-125', titre: 'Formation 125 cm³', detail: '7 heures', prixTTC: 290 },
  { formation: 'passerelle-a2-a', titre: 'Passerelle A2 vers A', detail: '7 leçons', prixTTC: 290 },
]

/**
 * Les prestations à la carte du flyer. `manuelle` et `automatique` : le prix
 * selon la boîte ; `prix` : un prix unique.
 */
export const PRESTATIONS_A_LA_CARTE: ReadonlyArray<
  { libelle: string } & ({ manuelle: number; automatique: number } | { prix: number })
> = [
  { libelle: '1 heure de conduite', manuelle: 55, automatique: 60 },
  { libelle: '10 heures de conduite', manuelle: 500, automatique: 550 },
  { libelle: '1 heure de conduite moto', manuelle: 55, automatique: 60 },
  { libelle: '10 heures de conduite moto', manuelle: 500, automatique: 550 },
  { libelle: 'Évaluation de départ', manuelle: 55, automatique: 60 },
  { libelle: 'Livre de code', prix: 25 },
  { libelle: 'Livre vérification intérieur/extérieur', prix: 15 },
  { libelle: 'Pack web 6 mois', prix: 50 },
  { libelle: 'Prolongation accès salle de code 6 mois', prix: 50 },
  { libelle: 'Avenant au contrat (prolongation d’un an)', prix: 200 },
]

/** Ce que dure une leçon de conduite, mot pour mot sur le flyer. */
export const DEFINITION_LECON =
  'Une leçon de conduite correspond à 5 min de définition des objectifs, 45 à 50 min de conduite effective et 5 à 10 min de bilan et de commentaires pédagogiques.'
