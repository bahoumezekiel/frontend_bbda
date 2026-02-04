import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Upload, FileText, ArrowLeft, CheckCircle, AlertCircle, Download, Loader2 } from 'lucide-react';
import { uploadOeuvre, getCertificatUrl } from '../api';
import type { UploadResponse } from "../types";

export default function UploadPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<UploadResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData(e.currentTarget);

    try {
      const response = await uploadOeuvre(formData);
      setResult(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(e.target.files?.[0] || null);
  };

  const resetForm = () => {
    setResult(null);
    setError(null);
    setSelectedFile(null);
  };

  return (
    <div className="py-8 animate-fade-in">
      <div className="max-w-3xl mx-auto px-4">
        {/* Breadcrumb */}
        <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-[#009639] mb-8">
          <ArrowLeft className="w-4 h-4" />
          Retour à l'accueil
        </Link>

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 rounded-xl bg-[#009639]/10">
            <Upload className="w-8 h-8 text-[#009639]" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Uploader une œuvre</h1>
            <p className="text-slate-600">Enregistrez votre création pour la protéger</p>
          </div>
        </div>

        {!result ? (
          <div className="card p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Titre */}
              <div>
                <label htmlFor="titre" className="label">Titre :</label>
                <input
                  type="text"
                  id="titre"
                  name="titre"
                  required
                  placeholder="Titre de votre œuvre"
                  className="input"
                />
              </div>

              {/* Auteur */}
              <div>
                <label htmlFor="auteur" className="label">Auteur :</label>
                <input
                  type="text"
                  id="auteur"
                  name="auteur"
                  required
                  placeholder="Votre nom complet"
                  className="input"
                />
              </div>

              {/* Genre */}
              <div>
                <label htmlFor="genre" className="label">Genre :</label>
                <select id="genre" name="genre" required className="input">
                  <option value="">Sélectionnez un genre</option>
                  <option value="texte">Texte / Littérature</option>
                  <option value="musique">Musique</option>
                  <option value="art">Art visuel</option>
                  <option value="video">Vidéo</option>
                  <option value="logiciel">Logiciel</option>
                  <option value="autre">Autre</option>
                </select>
              </div>

              {/* Langue */}
              <div>
                <label htmlFor="langue" className="label">Langue :</label>
                <select id="langue" name="langue" required className="input">
                  <option value="">Sélectionnez une langue</option>
                  <option value="fr">Français</option>
                  <option value="en">Anglais</option>
                  <option value="moore">Mooré</option>
                  <option value="dioula">Dioula</option>
                  <option value="fulfulde">Fulfulde</option>
                  <option value="autre">Autre</option>
                </select>
              </div>

              {/* Fichier */}
              <div>
                <label htmlFor="fichier" className="label">Fichier :</label>
                <div className="relative">
                  <input
                    type="file"
                    id="fichier"
                    name="fichier"
                    required
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="h-32 border-2 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center gap-2 hover:border-[#009639] hover:bg-[#009639]/5 transition-all">
                    <FileText className="w-8 h-8 text-slate-400" />
                    {selectedFile ? (
                      <div className="text-center">
                        <p className="text-sm font-medium text-[#009639]">{selectedFile.name}</p>
                        <p className="text-xs text-slate-500">{(selectedFile.size / 1024).toFixed(1)} Ko</p>
                      </div>
                    ) : (
                      <p className="text-sm text-slate-500">Cliquez ou glissez votre fichier ici</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              {/* Submit */}
              <button type="submit" disabled={isLoading} className="btn-primary w-full flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5" />
                    Uploader
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          /* Success Result */
          <div className="card p-8 border-l-4 border-l-[#009639]">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-full bg-[#009639]/10">
                <CheckCircle className="w-8 h-8 text-[#009639]" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#009639]">Œuvre enregistrée avec succès !</h2>
                <p className="text-slate-600">Votre création est maintenant protégée</p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-500 mb-1">Œuvre</p>
                <p className="font-medium">{result.oeuvre}</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-500 mb-1">Empreinte numérique (Hash)</p>
                <p className="font-mono text-sm break-all">{result.empreinte_hash}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={getCertificatUrl(result.certificat_url)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Télécharger le certificat
              </a>
              <button onClick={resetForm} className="btn-secondary">
                Nouvelle œuvre
              </button>
            </div>
          </div>
        )}

        {/* Info */}
        <div className="mt-8 p-6 bg-slate-50 rounded-xl">
          <h3 className="font-semibold mb-3">Comment ça marche ?</h3>
          <ol className="space-y-2 text-sm text-slate-600 list-decimal list-inside">
            <li>Remplissez les informations de votre œuvre</li>
            <li>Téléversez votre fichier (texte, audio, image...)</li>
            <li>Une empreinte numérique unique est générée</li>
            <li>Téléchargez votre certificat de propriété</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
