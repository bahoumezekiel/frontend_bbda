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
