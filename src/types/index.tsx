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
  