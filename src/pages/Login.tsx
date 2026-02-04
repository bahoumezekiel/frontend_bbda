import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Lock,
  Mail,
  Loader2,
  LogIn,
  ArrowLeft,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";
import { login } from "../api";

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await login(formData);
      if (response?.token) {
        localStorage.setItem("token", response?.token);
      }
      navigate("/dashboard");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Une erreur est survenue lors de la connexion"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FCD116]/20 via-white to-[#009639]/10 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="max-w-md w-full space-y-8">
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-[#009639] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour à l'accueil
        </Link>

        <div className="bg-white rounded-3xl p-10 shadow-2xl border border-slate-100">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex p-4 rounded-full bg-[#009639]/10 mb-4 shadow-md">
              <ShieldCheck className="w-12 h-12 text-[#009639]" />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900">
              Connexion
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Bienvenue sur{" "}
              <span className="text-[#009639] font-semibold">OeuvreGuard</span>{" "}
            
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
                value={formData.email}
                onChange={handleChange}
                placeholder="nom@exemple.com"
                className="w-full mt-2 px-4 py-3 rounded-lg border border-slate-300 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-[#009639] focus:outline-none transition-all"
                disabled={isLoading}
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="label flex items-center gap-2 text-slate-700"
                >
                  <Lock className="w-4 h-4" />
                  Mot de passe
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-medium text-[#009639] hover:underline"
                >
                  Oublié ?
                </Link>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
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

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-[#009639] hover:bg-[#007a2f] text-white font-semibold transition-all shadow-md hover:shadow-lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Connexion en cours...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Se connecter
                </>
              )}
            </button>
          </form>

          
        </div>

      </div>
    </div>
  );
}
