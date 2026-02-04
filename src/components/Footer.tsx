import { Link } from 'react-router-dom';
import { Shield, ExternalLink } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Barre tricolore */}
      <div className="h-1 gradient-faso" />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-[#009639]/20">
                <Shield className="w-6 h-6 text-[#009639]" />
              </div>
              <span className="font-bold text-xl text-white">
                Oeuvre<span className="text-[#009639]">Guard</span>
              </span>
            </div>
            <p className="text-sm text-slate-400">
              Plateforme de protection des œuvres créatives au Burkina Faso.
            </p>
          </div>

          {/* À propos */}
          <div>
            <h3 className="font-semibold text-[#009639] mb-4">À propos</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Notre mission</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pourquoi OeuvreGuard</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Sécurité</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-[#009639] mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/upload" className="hover:text-white transition-colors">Dépôt d'œuvres</Link></li>
              <li><Link to="/plagiat" className="hover:text-white transition-colors">Détection de plagiat</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Certificats</a></li>
            </ul>
          </div>

          {/* Aide */}
          <div>
            <h3 className="font-semibold text-[#009639] mb-4">Aide</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              <li>
                <a 
                  href="https://bbda.bf/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#FCD116] hover:text-yellow-300 transition-colors"
                >
                  BBDA <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
          © {year} | OeuvreGuard. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
