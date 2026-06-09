export type Category = "automatisation" | "marketing" | "plateformes" | "ia-data";

export interface Question {
  id: number;
  text: string;
  category: Category;
  categoryLabel: string;
  categoryShort: string;
}

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Zero perte de temps sur de la saisie, de la relance facture ou des taches papier.",
    category: "automatisation",
    categoryLabel: "Automatisation et BPO",
    categoryShort: "BPO",
  },
  {
    id: 2,
    text: "Tous nos outils informatiques (admin, RH, compta) communiquent sans ressaisie.",
    category: "automatisation",
    categoryLabel: "Automatisation et BPO",
    categoryShort: "BPO",
  },
  {
    id: 3,
    text: "Pas de surcharge mentale hebdomadaire liee a l'organisation ou a la gestion des plannings.",
    category: "automatisation",
    categoryLabel: "Automatisation et BPO",
    categoryShort: "BPO",
  },
  {
    id: 4,
    text: "Notre archivage et suivi documentaire sont 100% numerises et accessibles instantanement.",
    category: "automatisation",
    categoryLabel: "Automatisation et BPO",
    categoryShort: "BPO",
  },
  {
    id: 5,
    text: "Nous disposons d'un soutien operationnel externe agile en cas de pic d'activite.",
    category: "automatisation",
    categoryLabel: "Automatisation et BPO",
    categoryShort: "BPO",
  },
  {
    id: 6,
    text: "Nos reseaux sociaux pros sont actifs, avec une charte graphique forte et memorable.",
    category: "marketing",
    categoryLabel: "Visibilite et Acquisition",
    categoryShort: "VISIBILITE",
  },
  {
    id: 7,
    text: "Nous publions regulierement du contenu de haute qualite sans y passer nos week-ends.",
    category: "marketing",
    categoryLabel: "Visibilite et Acquisition",
    categoryShort: "VISIBILITE",
  },
  {
    id: 8,
    text: "Notre fiche Google locale (Fiche Etablissement) capte des appels et clients chaque semaine.",
    category: "marketing",
    categoryLabel: "Visibilite et Acquisition",
    categoryShort: "VISIBILITE",
  },
  {
    id: 9,
    text: "Notre identite visuelle (logo, supports) reflete fidelement l'excellence de notre savoir-faire.",
    category: "marketing",
    categoryLabel: "Visibilite et Acquisition",
    categoryShort: "VISIBILITE",
  },
  {
    id: 10,
    text: "Nous mesurons precisement le nombre de nouveaux clients generes par nos actions com.",
    category: "marketing",
    categoryLabel: "Visibilite et Acquisition",
    categoryShort: "VISIBILITE",
  },
  {
    id: 11,
    text: "Nous possedons un site vitrine moderne ou une boutique e-commerce active.",
    category: "plateformes",
    categoryLabel: "Plateformes Digitales",
    categoryShort: "PLATEFORMES",
  },
  {
    id: 12,
    text: "Notre site s'affiche en moins de 2 secondes et est parfait sur tous les mobiles.",
    category: "plateformes",
    categoryLabel: "Plateformes Digitales",
    categoryShort: "PLATEFORMES",
  },
  {
    id: 13,
    text: "Nos formulaires de contact ou tunnels d'achat convertissent efficacement l'audience.",
    category: "plateformes",
    categoryLabel: "Plateformes Digitales",
    categoryShort: "PLATEFORMES",
  },
  {
    id: 14,
    text: "Nos equipes modifient les textes, photos et fiches produits en totale autonomie.",
    category: "plateformes",
    categoryLabel: "Plateformes Digitales",
    categoryShort: "PLATEFORMES",
  },
  {
    id: 15,
    text: "Notre plateforme est securisee, mise a jour et n'accuse aucune panne technique.",
    category: "plateformes",
    categoryLabel: "Plateformes Digitales",
    categoryShort: "PLATEFORMES",
  },
  {
    id: 16,
    text: "Une IA ou un assistant automatise qualifie et repond a nos clients 24h/24 et 7j/7.",
    category: "ia-data",
    categoryLabel: "Solutions IA et Data",
    categoryShort: "IA et DATA",
  },
  {
    id: 17,
    text: "Nous automatisons nos redactions de rapports ou nos e-mails grace a l'IA generative.",
    category: "ia-data",
    categoryLabel: "Solutions IA et Data",
    categoryShort: "IA et DATA",
  },
  {
    id: 18,
    text: "Toutes nos donnees operationnelles sont centralisees au lieu d'etre eparpillees.",
    category: "ia-data",
    categoryLabel: "Solutions IA et Data",
    categoryShort: "IA et DATA",
  },
  {
    id: 19,
    text: "Nous anticipons nos decisions strategiques grace a un historique de donnees fiable.",
    category: "ia-data",
    categoryLabel: "Solutions IA et Data",
    categoryShort: "IA et DATA",
  },
  {
    id: 20,
    text: "Nous pilotons nos marges et indicateurs cles en temps reel via un tableau de bord synchro.",
    category: "ia-data",
    categoryLabel: "Solutions IA et Data",
    categoryShort: "IA et DATA",
  },
];

export const COEFFICIENTS = {
  automatisation: 0.25,
  marketing: 0.25,
  plateformes: 0.25,
  "ia-data": 0.25,
};