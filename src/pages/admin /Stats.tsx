import {
  BarChart3,
  Users,
  Clock,
  BookOpen,
  Music,
  FileText,
  ImageIcon,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export default function Stats() {
  // Données simulées (à remplacer par API)
  const totalOeuvres = 104;
  const symbolesObserves = 13;
  const oeuvresRecentes = 67;
  const oeuvresEnLice = 77;
  const finSelection = "17 novembre dernier (35)";
  const auteurs = 14;

  const typeData = [
    { type: "Image", count: 10 },
    { type: "Musique", count: 15 },
    { type: "Autre", count: 20 },
    { type: "Texte", count: 65 },
  ];

  const langueData = [
    { langue: "Française", value: 32.1 },
    { langue: "Français", value: 29.8 },
    { langue: "French", value: 16.7 },
    { langue: "Indien", value: 7.1 },
    { langue: "Autre", value: 4.8 },
    { langue: "FR", value: 4.8 },
    { langue: "Burkinabe", value: 3.6 },
    { langue: "français", value: 1.2 },
  ];

  const COLORS = [
    "#009639",
    "#007a2f",
    "#FCD116",
    "#FF6B6B",
    "#4ECDC4",
    "#1A535C",
    "#FF9F1C",
    "#5C3AFF",
  ];

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-extrabold text-slate-900">
        Statistiques & Graphiques
      </h1>

      {/* Cartes principales */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div className="p-6 bg-white rounded-2xl shadow-md border border-slate-200 text-center">
          <BookOpen className="w-8 h-8 text-[#009639] mx-auto mb-2" />
          <p className="text-sm text-slate-500">Total œuvres</p>
          <p className="text-2xl font-bold">{totalOeuvres}</p>
        </div>
        <div className="p-6 bg-white rounded-2xl shadow-md border border-slate-200 text-center">
          <BarChart3 className="w-8 h-8 text-[#009639] mx-auto mb-2" />
          <p className="text-sm text-slate-500">Symboles observés</p>
          <p className="text-2xl font-bold">{symbolesObserves}</p>
        </div>
        <div className="p-6 bg-white rounded-2xl shadow-md border border-slate-200 text-center">
          <Clock className="w-8 h-8 text-[#009639] mx-auto mb-2" />
          <p className="text-sm text-slate-500">Œuvres récentes</p>
          <p className="text-2xl font-bold">{oeuvresRecentes}</p>
        </div>
        <div className="p-6 bg-white rounded-2xl shadow-md border border-slate-200 text-center">
          <Users className="w-8 h-8 text-[#009639] mx-auto mb-2" />
          <p className="text-sm text-slate-500">Auteurs</p>
          <p className="text-2xl font-bold">{auteurs}</p>
        </div>
      </div>

      {/* Autres chiffres */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white rounded-2xl shadow-md border border-slate-200">
          <h2 className="text-lg font-semibold mb-4">Répartition par type</h2>
          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={typeData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="type" type="category" />
                <Tooltip />
                <Bar dataKey="count" fill="#009639" radius={[6, 6, 6, 6]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-6 bg-white rounded-2xl shadow-md border border-slate-200">
          <h2 className="text-lg font-semibold mb-4">Répartition par langue</h2>
          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={langueData}
                  dataKey="value"
                  nameKey="langue"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {langueData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Fin de sélection */}
      <div className="p-6 bg-white rounded-2xl shadow-md border border-slate-200">
        <h2 className="text-lg font-semibold mb-2">Fin de la sélection</h2>
        <p className="text-slate-700">{finSelection}</p>
      </div>
    </div>
  );
}
