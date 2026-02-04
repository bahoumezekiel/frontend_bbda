// Types
export interface UploadResponse {
  oeuvre: string;
  empreinte_hash: string;
  certificat_url: string;
}

export interface PlagiatResponse {
  analyse_id: string;
  rapport_pdf: string;
  similarite?: number;
}

// Login

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  user_id?: string;
  email?: string;
}

// Typage des données
export interface Oeuvre {
  score_ia: string;
  ia_detectee: string;
  date_creation: string;
  id: string;
  type_oeuvre: string;
  titre: string;
  auteur: string;
  genre: string;
  langue: string;
  fichier_nom: string;
  date_enregistrement: string;
}

export interface Plagiat {
  id: string;
  titre: string;
  auteur: string;
  ia_detectee: string; // ex: "IA" ou "None"
  score_ia: number | null; // score entre 0 et 1
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export const seedOeuvres: Oeuvre[] = [
  {
    id: "MUS-2025-0001",
    type_oeuvre: "Musique",
    titre: "Soleil Levant",
    auteur: "Awa Traoré",
    genre: "Afrobeat",
    langue: "Français",
    fichier_nom: "soleil_levant.mp3",
    date_enregistrement: "2025-01-15 10:30:00",
    score_ia: "string",
    ia_detectee: "string",
    date_creation: "string",
  },
  {
    id: "TXT-2025-0002",
    type_oeuvre: "Texte",
    titre: "Essai sur la gouvernance",
    auteur: "Severin Dembele",
    genre: "Académique",
    langue: "Français",
    fichier_nom: "gouvernance.pdf",
    date_enregistrement: "2025-01-20 14:12:10",
    score_ia: "string",
    ia_detectee: "string",
    date_creation: "string",
  },
  {
    id: "MUS-2025-0003",
    type_oeuvre: "Musique",
    titre: "Burkina Vibes",
    auteur: "Soflano",
    genre: "Rap",
    langue: "Mooré",
    fichier_nom: "burkina_vibes.mp3",
    date_enregistrement: "2025-01-22 22:23:39",
    score_ia: "string",
    ia_detectee: "string",
    date_creation: "string",
  },
];

export const seedPlagiats: Plagiat[] = [
  {
    id: "BOOK-2025-032438",
    titre: "Hec",
    auteur: "testa",
    ia_detectee: "IA",
    score_ia: 0.7513,
  },
  {
    id: "BOOK-2025-032605",
    titre: "Hec",
    auteur: "testa",
    ia_detectee: "IA",
    score_ia: 0.7513,
  },
  {
    id: "BOOK-2025-032632",
    titre: "Hec",
    auteur: "testa",
    ia_detectee: "IA",
    score_ia: 0.7513,
  },
  {
    id: "BOOK-2025-032701",
    titre: "test",
    auteur: "testa",
    ia_detectee: "IA",
    score_ia: 0.7513,
  },
  {
    id: "BOOK-2025-085842",
    titre: "Gims",
    auteur: "Maitre",
    ia_detectee: "IA",
    score_ia: 0.7513,
  },
];


export const seedUsers: User[] = [
  {
    id: 1,
    name: "Severin Dembele",
    email: "severin@email.com",
    role: "Admin",
  },
  {
    id: 2,
    name: "Awa Traoré",
    email: "awa@email.com",
    role: "Auteur",
  },
  {
    id: 3,
    name: "Soflano",
    email: "soflano@email.com",
    role: "Musicien",
  },
  {
    id: 4,
    name: "Mariam Ouédraogo",
    email: "mariam@email.com",
    role: "Lectrice",
  },
  {
    id: 5,
    name: "Issa Konaté",
    email: "issa@email.com",
    role: "Editeur",
  },
];
