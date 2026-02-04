/**
 * Configuration API pour OeuvreGuard
 * Modifiez API_BASE_URL pour pointer vers votre serveur backend
 */

import type { UploadResponse, PlagiatResponse} from "./types";


// URL de base de l'API - À MODIFIER selon votre configuration
export const API_BASE_URL = "http://127.0.0.1:8000";


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
