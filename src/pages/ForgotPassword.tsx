import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft, Loader2, AlertCircle, KeyRound } from "lucide-react";
import { forgotPassword } from "../api"; // à implémenter côté API

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await forgotPassword({ email });
      if (response?.message) {
        setSuccess(
          "Un lien de réinitialisation a été envoyé à votre adresse email."
        );
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Une erreur est survenue lors de la demande"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-slate-100 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="max-w-md w-full space-y-8">
        {/* Back Link */}
        <Link
          to="/login"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-[#009639] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour à la connexion
        </Link>

        <div className="bg-white rounded-3xl p-10 shadow-2xl border border-slate-200">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex p-4 rounded-full bg-[#009639]/10 mb-4 shadow-md">
              <KeyRound className="w-12 h-12 text-[#009639]" />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              Mot de passe oublié
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Entrez votre adresse email pour recevoir un lien de
              réinitialisation 
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="label flex items-center gap-2 text-slate-700"
              >
                <Mail className="w-4 h-4" />
                Adresse Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nom@exemple.com"
                className="w-full mt-2 px-4 py-3 rounded-lg border border-slate-300 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-[#009639] focus:outline-none transition-all"
                disabled={isLoading}
              />
            </div>

            {/* Error */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 animate-shake">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Success */}
            {success && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3 animate-fade-in">
                <Mail className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-green-700">{success}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-[#009639] hover:bg-[#007a2f] text-white font-semibold transition-all shadow-md hover:shadow-lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Envoi en cours...
                </>
              ) : (
                <>
                  <KeyRound className="w-5 h-5" />
                  Envoyer le lien
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center border-t border-slate-200 pt-6">
            <p className="text-sm text-slate-600">
              Vous vous souvenez de votre mot de passe ?{" "}
              <Link
                to="/login"
                className="font-bold text-[#009639] hover:underline"
              >
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
