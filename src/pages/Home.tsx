import { Link } from 'react-router-dom';
import { 
  Shield, Upload, Search, CheckCircle, Zap, 
  ShieldCheck, TrendingUp, ChevronRight, Star 
} from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: "Dépôt d'œuvres simplifié",
    description: "Enregistrez vos créations en quelques secondes et stockez-les de manière sécurisée."
  },
  {
    icon: ShieldCheck,
    title: "Empreinte numérique infalsifiable",
    description: "Chaque œuvre reçoit une signature cryptographique unique garantissant son authenticité."
  },
  {
    icon: TrendingUp,
    title: "Détection avancée de plagiat",
    description: "Notre IA compare votre œuvre à une base de données et détecte les similarités."
  }
];

const testimonials = [
  { name: "Marie Sawadogo", role: "Écrivaine", rating: 5, text: "Grâce à OeuvreGuard, j'ai enfin un moyen simple de protéger mes écrits." },
  { name: "Pierre Zongo", role: "Compositeur", rating: 4, text: "L'interface est claire, rapide et professionnelle." },
  { name: "Aïcha Traoré", role: "Artiste", rating: 5, text: "L'analyse de plagiat est bluffante !" }
];

export default function Home() {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="max-w-3xl">
            <p className="text-[#009639] font-medium mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Bienvenue sur OeuvreGuard
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Votre allié pour protéger, authentifier et sécuriser vos{' '}
              <span className="text-[#FCD116]">créations</span>
            </h1>
            
            <ul className="space-y-3 mb-8">
              {[
                "Déposez vos œuvres en toute simplicité",
                "Générez une empreinte numérique infalsifiable",
                "Détectez instantanément les plagiats",
                "Obtenez un certificat officiel de propriété"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-300">
                  <CheckCircle className="w-5 h-5 text-[#009639]" />
                  {item}
                </li>
              ))}
            </ul>

            <p className="text-lg text-[#FCD116] font-semibold mb-8">
              Protégez votre créativité. Défendez vos droits.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/upload" className="btn-primary inline-flex items-center gap-2">
                Commencer maintenant <ChevronRight className="w-5 h-5" />
              </Link>
              <Link to="/plagiat" className="btn-secondary">
                Vérifier le plagiat
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Action Cards */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Que souhaitez-vous faire ?</h2>
          <p className="text-slate-600 text-center mb-12">Choisissez l'action qui correspond à votre besoin</p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Link to="/upload" className="card p-6 hover:border-[#009639] border-2 border-transparent transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-[#009639]/10">
                  <Upload className="w-8 h-8 text-[#009639]" />
                </div>
                <h3 className="text-xl font-bold">Déposer une œuvre</h3>
              </div>
              <p className="text-slate-600">
                Ajoutez vos créations dans la base sécurisée pour les protéger et les valoriser.
              </p>
            </Link>

            <Link to="/plagiat" className="card p-6 hover:border-[#009639] border-2 border-transparent transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-[#009639]/10">
                  <Search className="w-8 h-8 text-[#009639]" />
                </div>
                <h3 className="text-xl font-bold">Vérifier le plagiat</h3>
              </div>
              <p className="text-slate-600">
                Analysez vos œuvres pour détecter les similitudes et éviter les copies.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Nos avantages</h2>
          <p className="text-slate-600 text-center mb-12">Découvrez pourquoi adopter OeuvreGuard</p>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div key={i} className="card p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#009639]/10 flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-[#009639]" />
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Ce que disent les artistes</h2>
          <p className="text-slate-600 text-center mb-12">Découvrez les expériences de nos utilisateurs</p>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="card p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#009639]/20 flex items-center justify-center">
                    <span className="font-bold text-[#009639] text-lg">{t.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">{t.name}</h4>
                    <p className="text-sm text-slate-500">{t.role}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className={`w-4 h-4 ${j < t.rating ? 'text-[#FCD116] fill-[#FCD116]' : 'text-slate-300'}`} />
                  ))}
                </div>
                <p className="text-slate-600 italic">"{t.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
