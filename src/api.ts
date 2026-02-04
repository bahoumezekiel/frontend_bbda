/**
 * Configuration API pour OeuvreGuard
 * Modifiez API_BASE_URL pour pointer vers votre serveur backend
 */

import type { UploadResponse, PlagiatResponse,LoginRequest, LoginResponse, Oeuvre, Plagiat, User} from "./types";


// URL de base de l'API - À MODIFIER selon votre configuration
export const API_BASE_URL = "http://127.0.0.1:8000";


/**
 * Connexion de l'utilisateur
 */
export async function login(credentials: LoginRequest): Promise<LoginResponse> {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Identifiants invalides");
  }

  return response.json();
}


/**
 * Demande de réinitialisation du mot de passe
 */
export async function forgotPassword(payload: { email: string }): Promise<{ message: string }> {
  const response = await fetch(`${API_BASE_URL}/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Impossible d'envoyer le lien de réinitialisation");
  }

  return response.json();
}


/**
 * Upload d'une œuvre
 */
export async function uploadOeuvre(formData: FormData): Promise<UploadResponse> {
  const response = await fetch(`${API_BASE_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Erreur lors de l'upload");
  }

  return response.json();
}


export async function getOeuvres(): Promise<Oeuvre[]> {
  const response = await fetch(`${API_BASE_URL}/oeuvres`, {
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Erreur lors du chargement des œuvres");
  }
  return response.json();
}


/**
 * Vérification de plagiat
 */
export async function verifierPlagiat(formData: FormData): Promise<PlagiatResponse> {
  const response = await fetch(`${API_BASE_URL}/plagiat`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Erreur lors de l'analyse");
  }

  return response.json();
}

export async function getPlagiats(): Promise<Plagiat[]> {
  const response = await fetch(`${API_BASE_URL}/plagiats`, {
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Erreur lors du chargement des plagiats");
  }
  return response.json();
}


/**
 * Obtenir l'URL du rapport PDF
 */
export function getReportUrl(rapportPath: string): string {
  return `${API_BASE_URL}${rapportPath}`;
}

/**
 * Obtenir l'URL du certificat
 */
export function getCertificatUrl(certificatPath: string): string {
  if (certificatPath.startsWith("http")) {
    return certificatPath;
  }
  return `${API_BASE_URL}${certificatPath}`;
}



// LIST : récupérer tous les utilisateurs
export async function getUsers(): Promise<User[]> {
  const response = await fetch(`${API_BASE_URL}/users`, {
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error("Erreur lors du chargement des utilisateurs");
  }
  return response.json();
}

// CREATE : ajouter un utilisateur
export async function addUser(user: Omit<User, "id">): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!response.ok) {
    throw new Error("Erreur lors de l'ajout de l'utilisateur");
  }
  return response.json();
}

// UPDATE : modifier un utilisateur
export async function updateUser(user: User): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/users/${user.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!response.ok) {
    throw new Error("Erreur lors de la mise à jour de l'utilisateur");
  }
  return response.json();
}

// DELETE : supprimer un utilisateur
export async function deleteUser(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/users/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Erreur lors de la suppression de l'utilisateur");
  }
}
