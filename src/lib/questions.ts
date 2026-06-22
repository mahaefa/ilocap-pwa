export type ProfilType = "solo" | "croissance" | "mature";

export interface Profil {
  id: ProfilType;
  label: string;
  description: string;
  color: string;
  taille: string;
  frustrations: string[];
  actionsGratuites: string[];
  actionsILOCAP: { label: string; service: string; roi: string }[];
}

export interface DeclencheurOption {
  label: string;
  profil: ProfilType;
}

export const PROFILS: Profil[] = [
  {
    id: "solo",
    label: "Solo / Indépendant",
    description: "Vous gérez seul ou avec 1-2 personnes. Vous cherchez à gagner du temps et être visible sans y passer vos soirées.",
    color: "#B89A5A",
    taille: "1-3 personnes",
    frustrations: [
      "Rédiger des devis et relancer des factures le soir",
      "Perdre des clients par manque de réactivité",
      "Gérer seul la compta, le marketing, la prod"
    ],
    actionsGratuites: [
      "Créer une réponse automatique Gmail avec vos horaires et tarifs",
      "Demander 3 avis Google à vos 3 meilleurs clients de l'année",
      "Noter vos 5 tâches répétitives et chronométrer la plus longue"
    ],
    actionsILOCAP: [
      { label: "Automatiser vos devis/factures", service: "BPO Administration", roi: "4h/semaine gagnées" },
      { label: "Créer votre fiche Google optimisée", service: "Marketing Local", roi: "+30% de contacts" },
      { label: "Installer un CRM simple", service: "Centralisation", roi: "0 opportunité perdue" }
    ]
  },
  {
    id: "croissance",
    label: "PME en Croissance",
    description: "Vous avez 3-15 personnes. Vous grandissez mais vos outils ne suivent pas. Vous voulez professionnaliser sans alourdir.",
    color: "#073642",
    taille: "3-15 personnes",
    frustrations: [
      "Coordonner l'équipe par WhatsApp et Excel",
      "Manquer des pics d'activité faute de réactivité",
      "Perdre du temps en réunions de synchronisation"
    ],
    actionsGratuites: [
      "Créer un canal Slack/Teams dédié aux urgences client",
      "Mapper votre parcours client (de la demande à la facture)",
      "Identifier qui fait quoi : tableau des responsabilités"
    ],
    actionsILOCAP: [
      { label: "Plateforme collaborative intégrée", service: "Outils Collaboratifs", roi: "2h/jour par employé" },
      { label: "Tunnel de conversion automatisé", service: "Inbound Marketing", roi: "+40% de leads qualifiés" },
      { label: "Support client externalisé", service: "BPO Agile", roi: "Flexibilité 100% variable" }
    ]
  },
  {
    id: "mature",
    label: "Entreprise Structurée",
    description: "Vous avez +15 salariés, des processus, des outils. Vous cherchez l'efficience, la gouvernance et l'avantage compétitif.",
    color: "#2A5A5F",
    taille: "+15 personnes",
    frustrations: [
      "Siloing des données entre services (RH, Compta, Commercial)",
      "Rapports et audits qui prennent des jours à produire",
      "Manque de visibilité temps réel sur les indicateurs clés"
    ],
    actionsGratuites: [
      "Auditer vos 5 outils principaux : quels doublons ?",
      "Créer un tableau de bord manuel avec vos 3 KPIs critiques",
      "Interviewer 3 collaborateurs : leur plus grosse perte de temps ?"
    ],
    actionsILOCAP: [
      { label: "Intégration systèmes (API/ESB)", service: "Architecture SI", roi: "-50% erreurs de saisie" },
      { label: "Rapports automatisés par IA", service: "IA Générative", roi: "Jours → Minutes" },
      { label: "BPO industriel avec KPIs", service: "Externalisation Structurée", roi: "Capex → Opex" }
    ]
  }
];

export const DECLENCHEUR_OPTIONS: DeclencheurOption[] = [
  { label: "Moins de temps à chercher des infos ou recopier des données", profil: "solo" },
  { label: "Moins de rendez-vous manqués ou de relances à faire", profil: "solo" },
  { label: "Moins de temps à préparer des devis, rapports, propositions", profil: "croissance" },
  { label: "Plus de clients qui me trouvent et me contactent sans effort", profil: "solo" },
  { label: "Des décisions plus rapides basées sur des chiffres fiables", profil: "mature" },
  { label: "Moins de réunions et plus de coordination automatique", profil: "croissance" },
  { label: "Industrialiser ce que je fais déjà bien pour déployer à grande échelle", profil: "mature" }
];

export interface DiagnosticResult {
  profil: ProfilType;
  tempsPerdu: number;
  opportunitesManquees: number;
  priorite: string;
  score: number;
  niveau: "Survivant" | "Opportuniste" | "Stratège" | "Leader";
}

export function calculateDiagnostic(
  profil: ProfilType,
  reponses: number[]
): DiagnosticResult {
  const totalScore = reponses.reduce((sum, val) => sum + val, 0);
  const maxScore = reponses.length * 4;
  const score = Math.round((totalScore / maxScore) * 100);

  const baseTemps = profil === "solo" ? 15 : profil === "croissance" ? 25 : 40;
  const baseOpportunites = profil === "solo" ? 5 : profil === "croissance" ? 8 : 12;

  const tempsPerdu = Math.round(baseTemps * (1 - totalScore / maxScore));
  const opportunitesManquees = Math.round(baseOpportunites * (1 - totalScore / maxScore));

  const niveau = score <= 30 ? "Survivant" : score <= 60 ? "Opportuniste" : score <= 85 ? "Stratège" : "Leader";

  const priorites = [
    "Automatisation administrative",
    "Visibilité et acquisition client",
    "Centralisation et réactivité",
    "Intelligence artificielle appliquée",
    "Industrialisation des processus"
  ];

  return {
    profil,
    tempsPerdu,
    opportunitesManquees,
    priorite: priorites[Math.min(reponses.length - 1, 4)] || priorites[0],
    score,
    niveau
  };
}

export const MATURITY_LEVELS = [
  {
    max: 30,
    label: "Survivant",
    color: "#C0392B",
    description: "Vous gérez au jour le jour. L'urgence l'emporte sur la stratégie.",
    action: "3 actions gratuites cette semaine pour respirer"
  },
  {
    max: 60,
    label: "Opportuniste",
    color: "#E67E22",
    description: "Vous avez des bonnes pratiques mais elles ne sont pas systématisées.",
    action: "Un audit rapide pour identifier les quick wins"
  },
  {
    max: 85,
    label: "Stratège",
    color: "#B89A5A",
    description: "Vous structurez votre croissance. Il manque l'accélérateur.",
    action: "Un atelier pour aligner vos outils et vos équipes"
  },
  {
    max: 100,
    label: "Leader",
    color: "#073642",
    description: "Vous maîtrisez votre transformation. L'enjeu est l'excellence.",
    action: "Un benchmark pour dépasser vos concurrents"
  }
];

export const QUESTIONS: Record<ProfilType, { id: number; text: string; options: { label: string; sub: string; score: number }[] }[]> = {
  solo: [
    {
      id: 1,
      text: "Vos clients vous trouvent-ils en ligne ou uniquement par bouche-à-oreille ?",
      options: [
        { label: "Bouche-à-oreille uniquement", sub: "Je n'ai pas de présence en ligne", score: 0 },
        { label: "Réseaux sociaux basiques", sub: "Facebook ou Instagram, peu nourris", score: 1 },
        { label: "Site ou Google My Business", sub: "Mais peu de réservations en ligne", score: 2 },
        { label: "Système complet en ligne", sub: "Réservation, paiement, rappels automatiques", score: 3 }
      ]
    },
    {
      id: 2,
      text: "Combien de temps perdez-vous en devis, relances, factures, plannings ?",
      options: [
        { label: "Plus de 2h/jour", sub: "J'appelle chaque client, je gère tout sur papier", score: 0 },
        { label: "1 à 2h/jour", sub: "SMS groupés ou agenda partagé basique", score: 1 },
        { label: "30min à 1h/jour", sub: "J'ai un outil mais je dois tout vérifier", score: 2 },
        { label: "Moins de 30min", sub: "Rappels et confirmations automatiques", score: 3 }
      ]
    },
    {
      id: 3,
      text: "Répondez-vous aux appels et mails en soirée et week-end ?",
      options: [
        { label: "Tout le temps", sub: "Je ne décroche jamais, même le dimanche", score: 0 },
        { label: "Souvent", sub: "Je réponds quand je peux, mais c'est stressant", score: 1 },
        { label: "Parfois", sub: "J'ai une réponse auto mais je vérifie tout", score: 2 },
        { label: "Jamais", sub: "Réponse auto + confirmation auto, je me déconnecte", score: 3 }
      ]
    },
    {
      id: 4,
      text: "Avez-vous une fiche Google avec avis clients et une stratégie de réponse ?",
      options: [
        { label: "Pas de fiche Google", sub: "Ou très peu d'avis", score: 0 },
        { label: "Fiche existante", sub: "Mais je ne la gère pas, avis sans réponse", score: 1 },
        { label: "Je réponds aux avis", sub: "Et je demande parfois des avis clients", score: 2 },
        { label: "Stratégie active", sub: "Je demande systématiquement et analyse les avis", score: 3 }
      ]
    },
    {
      id: 5,
      text: "Fidélisez-vous vos clients réguliers automatiquement ?",
      options: [
        { label: "Pas de fidélisation", sub: "Ils reviennent quand ils veulent", score: 0 },
        { label: "Manuellement", sub: "Je retiens les visages et préférences", score: 1 },
        { label: "Carte papier ou carnet", sub: "Ou envois sporadiques par SMS", score: 2 },
        { label: "Automatique", sub: "Anniversaire, offres perso, rappels d'entretien", score: 3 }
      ]
    }
  ],
  croissance: [
    {
      id: 1,
      text: "Vos outils (CRM, compta, planning, réservation) communiquent-ils entre eux ?",
      options: [
        { label: "Pas du tout", sub: "Recopie manuelle, erreurs fréquentes", score: 0 },
        { label: "Quelques exports", sub: "Mais c'est fragile et pas en temps réel", score: 1 },
        { label: "Partiellement", sub: "Les outils principaux parlent, pas tous", score: 2 },
        { label: "Totalement", sub: "Données synchronisées automatiquement", score: 3 }
      ]
    },
    {
      id: 2,
      text: "Quand un prospect contacte, combien de temps pour un devis / proposition / réservation ?",
      options: [
        { label: "Plusieurs jours", sub: "Je dois rassembler des infos, calculer, formater", score: 0 },
        { label: "1 à 2 jours", sub: "J'ai un modèle mais je l'adapte à la main", score: 1 },
        { label: "Quelques heures", sub: "Templates mais personnalisation manuelle", score: 2 },
        { label: "Instantané", sub: "Génération semi-auto ou auto avec mes tarifs", score: 3 }
      ]
    },
    {
      id: 3,
      text: "Vos équipes (terrain, bureau, consultants) sont-elles synchronisées en temps réel ?",
      options: [
        { label: "Non", sub: "Ils appellent ou reviennent au bureau pour faire le point", score: 0 },
        { label: "Par WhatsApp/SMS", sub: "C'est désorganisé et pas traçable", score: 1 },
        { label: "App basique", sub: "Mais pas intégrée aux processus métier", score: 2 },
        { label: "Oui", sub: "App mobile connectée au planning, stock, facturation", score: 3 }
      ]
    },
    {
      id: 4,
      text: "Avez-vous des pics d'activité où vous manquez de bras ou de réactivité ?",
      options: [
        { label: "Tout le temps", sub: "Je refuse des clients faute de capacité", score: 0 },
        { label: "Souvent", sub: "Je surcharge mes équipes ou délais allongés", score: 1 },
        { label: "Parfois", sub: "J'anticipe mais je manque de flexibilité", score: 2 },
        { label: "Rarement", sub: "J'absorbe les pics sans rupture de service", score: 3 }
      ]
    },
    {
      id: 5,
      text: "Vos données vous aident-elles à anticiper ou juste à constater ?",
      options: [
        { label: "Je constate", sub: "Rapports mensuels, trop tard pour agir", score: 0 },
        { label: "Je surveille", sub: "Tableaux Excel fastidieux et souvent obsolètes", score: 1 },
        { label: "J'explore", sub: "KPIs dans mes outils mais pas croisés", score: 2 },
        { label: "J'anticipe", sub: "Alertes automatiques, tendances détectées en amont", score: 3 }
      ]
    }
  ],
  mature: [
    {
      id: 1,
      text: "Vos silos (RH, Compta, Commercial, Donateurs, Fournisseurs) partagent-ils leurs données ?",
      options: [
        { label: "Silos stricts", sub: "Chaque service a ses outils, pas d'échange", score: 0 },
        { label: "Exports manuels", sub: "Réunions de synchronisation hebdomadaires", score: 1 },
        { label: "Partiellement", sub: "Quelques intégrations mais points de friction", score: 2 },
        { label: "Plateforme unifiée", sub: "Visibilité temps réel transversale", score: 3 }
      ]
    },
    {
      id: 2,
      text: "Combien de temps pour produire un rapport, un audit, un bilan d'impact ?",
      options: [
        { label: "Plusieurs jours", sub: "Collecte manuelle, consolidation, formatage", score: 0 },
        { label: "1 à 2 jours", sub: "Templates mais extraction et adaptation manuelles", score: 1 },
        { label: "Quelques heures", sub: "Données centralisées mais traitement manuel", score: 2 },
        { label: "Quelques minutes", sub: "Rapports auto-générés, paramétrables", score: 3 }
      ]
    },
    {
      id: 3,
      text: "Vos décisions stratégiques s'appuient-elles sur des données prédictives ?",
      options: [
        { label: "Intuition et expérience", sub: "Peu ou pas de données exploitables", score: 0 },
        { label: "Rapports historiques", sub: "Je sais ce qui s'est passé, pas ce qui va se passer", score: 1 },
        { label: "Prévisions manuelles", sub: "Basées sur des tendances passées", score: 2 },
        { label: "Modèles prédictifs", sub: "IA/ML intégrés, scénarios simulés", score: 3 }
      ]
    },
    {
      id: 4,
      text: "Vos processus critiques peuvent-ils être externalisés avec SLA et KPIs ?",
      options: [
        { label: "Non externalisable", sub: "Tout est interne, dépendant de personnes clés", score: 0 },
        { label: "Possible mais non structuré", sub: "Pas de SLA, pas de mesure", score: 1 },
        { label: "Partiellement", sub: "Quelques processus externalisés, KPIs basiques", score: 2 },
        { label: "Industrialisé", sub: "BPO structuré, SLA, KPIs temps réel, continuous improvement", score: 3 }
      ]
    },
    {
      id: 5,
      text: "Vos équipes testent-elles de nouvelles idées rapidement ?",
      options: [
        { label: "Jamais", sub: "Chaque projet nécessite comité, budget, mois de validation", score: 0 },
        { label: "Rarement", sub: "Budgets d'innovation mais processus lourds", score: 1 },
        { label: "Parfois", sub: "Hackathons ou pilotes, peu aboutissent", score: 2 },
        { label: "En continu", sub: "Équipes dédiées, cycles courts, mesure et itération", score: 3 }
      ]
    }
  ]
};