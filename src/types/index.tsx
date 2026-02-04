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
