import { Link, useLocation } from "react-router-dom";
import { Shield, Menu, X, LogIn } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: "/", label: "Accueil" },
    { path: "/upload", label: "Déposer une œuvre" },
    { path: "/plagiat", label: "Vérifier le plagiat" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      {/* Barre tricolore */}
      <div className="h-1 gradient-faso" />

      <div className="max-w-6xl mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-[#009639]/10">
              <Shield className="w-6 h-6 text-[#009639]" />
            </div>
            <span className="font-bold text-xl text-slate-800">
              Oeuvre<span className="text-[#009639]">Guard</span>
            </span>
          </Link>

          {/* Navigation Desktop */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  isActive(link.path)
                    ? "bg-[#009639] text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Bouton Connexion */}
            <Link
              to="/login"
              className="ml-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium bg-[#009639] text-white hover:bg-[#007a2f] transition-all shadow-sm"
            >
              <LogIn className="w-4 h-4" />
              Connexion
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-slate-100"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 animate-fade-in space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg font-medium ${
                  isActive(link.path)
                    ? "bg-[#009639] text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Bouton Connexion en mobile */}
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-3 rounded-lg font-medium bg-[#009639] text-white hover:bg-[#007a2f] transition-all"
            >
              Connexion
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
