import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  FileText,
  Upload,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  Download,
  Loader2,
} from "lucide-react";
import { verifierPlagiat, getReportUrl } from "../api";
import type { PlagiatResponse } from "../types";

export default function Plagiat() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PlagiatResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [inputMethod, setInputMethod] = useState<"text" | "file">("text");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData(e.currentTarget);

    try {
      const response = await verifierPlagiat(formData);
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

  const getRiskLevel = (similarite?: number) => {
    if (!similarite)
      return { color: "slate", label: "Non déterminé", icon: AlertCircle };
    if (similarite < 15)
      return { color: "green", label: "Faible risque", icon: CheckCircle };
    if (similarite < 40)
      return { color: "amber", label: "Risque modéré", icon: AlertTriangle };
    return { color: "red", label: "Risque élevé", icon: AlertCircle };
  };

  return (
    <div className="py-8 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-[#009639] mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour à l'accueil
        </Link>

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 rounded-xl bg-[#009639]/10">
            <Search className="w-8 h-8 text-[#009639]" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Vérification de plagiat</h1>
            <p className="text-slate-600">
              Analysez votre contenu pour détecter les similitudes
            </p>
          </div>
        </div>

        {!result ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Contenu - Gauche */}
            <div className="card p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Input Method Toggle */}
                <div className="flex gap-2 p-1 bg-slate-100 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setInputMethod("text")}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                      inputMethod === "text"
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    <FileText className="w-4 h-4" />
                    Texte
                  </button>
                  <button
                    type="button"
                    onClick={() => setInputMethod("file")}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                      inputMethod === "file"
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    <Upload className="w-4 h-4" />
                    Fichier
                  </button>
                </div>

                {/* Text Input */}
                {inputMethod === "text" && (
                  <div>
                    <label htmlFor="texte" className="label">
                      Texte à vérifier :
                    </label>
                    <textarea
                      id="texte"
                      name="texte"
                      rows={10}
                      placeholder="Collez votre texte ici..."
                      className="textarea"
                    />
                  </div>
                )}

                {/* File Input */}
                {inputMethod === "file" && (
                  <div>
                    <label htmlFor="fichier" className="label">
                      Fichier à analyser :
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        id="fichier"
                        name="fichier"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="h-40 border-2 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center gap-3 hover:border-[#009639] hover:bg-[#009639]/5 transition-all">
                        <Upload className="w-10 h-10 text-slate-400" />
                        {selectedFile ? (
                          <div className="text-center">
                            <p className="text-sm font-medium text-[#009639]">
                              {selectedFile.name}
                            </p>
                            <p className="text-xs text-slate-500 mt-1">
                              {(selectedFile.size / 1024).toFixed(1)} Ko
                            </p>
                          </div>
                        ) : (
                          <div className="text-center">
                            <p className="text-sm text-slate-500">
                              Cliquez ou glissez votre fichier ici
                            </p>
                            <p className="text-xs text-slate-400 mt-1">
                              Formats: TXT, PDF, DOCX
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Error */}
                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Analyse en cours...
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5" />
                      Analyser
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Image - Droite */}
            <div className="hidden lg:flex items-center justify-center">
              <img
                src="/images/oeuvre-guard-plagiat.png"
                alt="Vérification de plagiat"
                className="w-full max-w-md h-auto object-contain rounded-lg shadow-lg"
              />
            </div>
          </div>
        ) : (
          /* Results */
          <div className="space-y-6">
            {/* Summary */}
            <div className="card p-8 border-l-4 border-l-[#009639]">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-full bg-[#009639]/10">
                  <CheckCircle className="w-8 h-8 text-[#009639]" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Analyse terminée</h2>
                  <p className="text-slate-600">
                    Voici les résultats de l'analyse
                  </p>
                </div>
              </div>

              {/* Similarity Score */}
              {result.similarite !== undefined && (
                <div className="p-6 bg-slate-50 rounded-xl mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-medium">Taux de similarité</span>
                    <span
                      className={`text-2xl font-bold ${
                        getRiskLevel(result.similarite).color === "green"
                          ? "text-green-600"
                          : getRiskLevel(result.similarite).color === "amber"
                          ? "text-amber-600"
                          : getRiskLevel(result.similarite).color === "red"
                          ? "text-red-600"
                          : "text-slate-600"
                      }`}
                    >
                      {result.similarite}%
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden mb-3">
                    <div
                      className={`h-full transition-all ${
                        getRiskLevel(result.similarite).color === "green"
                          ? "bg-green-500"
                          : getRiskLevel(result.similarite).color === "amber"
                          ? "bg-amber-500"
                          : getRiskLevel(result.similarite).color === "red"
                          ? "bg-red-500"
                          : "bg-slate-400"
                      }`}
                      style={{ width: `${result.similarite}%` }}
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    {(() => {
                      const risk = getRiskLevel(result.similarite);
                      const Icon = risk.icon;
                      return (
                        <>
                          <Icon
                            className={`w-5 h-5 ${
                              risk.color === "green"
                                ? "text-green-600"
                                : risk.color === "amber"
                                ? "text-amber-600"
                                : risk.color === "red"
                                ? "text-red-600"
                                : "text-slate-600"
                            }`}
                          />
                          <span
                            className={`text-sm font-medium ${
                              risk.color === "green"
                                ? "text-green-600"
                                : risk.color === "amber"
                                ? "text-amber-600"
                                : risk.color === "red"
                                ? "text-red-600"
                                : "text-slate-600"
                            }`}
                          >
                            {risk.label}
                          </span>
                        </>
                      );
                    })()}
                  </div>
                </div>
              )}

              {/* Analysis ID */}
              <div className="p-4 bg-slate-50 rounded-lg mb-6">
                <p className="text-sm text-slate-500 mb-1">ID de l'analyse</p>
                <p className="font-mono text-sm">{result.analyse_id}</p>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                {result.rapport_pdf && (
                  <a
                    href={getReportUrl(result.rapport_pdf)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary flex items-center justify-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Télécharger le rapport PDF
                  </a>
                )}
                <button onClick={resetForm} className="btn-secondary">
                  Nouvelle analyse
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Info */}
        <div className="mt-8 p-6 bg-slate-50 rounded-xl">
          <h3 className="font-semibold mb-3">Notre technologie</h3>
          <ul className="space-y-2 text-sm text-slate-600">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-[#009639] flex-shrink-0 mt-0.5" />
              Comparaison avec notre base de données d'œuvres enregistrées
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-[#009639] flex-shrink-0 mt-0.5" />
              Algorithme d'IA avancé pour détecter les similitudes
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-[#009639] flex-shrink-0 mt-0.5" />
              Rapport détaillé avec les sources identifiées
            </li>
          </ul>
        </div>

        {/* Link to Upload */}
        <div className="mt-6 p-6 bg-[#009639]/5 rounded-xl border border-[#009639]/20">
          <p className="text-sm mb-3">
            Vous avez une œuvre originale à protéger ?
          </p>
          <Link to="/upload" className="btn-secondary inline-block">
            Déposer une œuvre
          </Link>
        </div>
      </div>
    </div>
  );
}
