import { useEffect, useState } from "react";
import {
  AlertCircle,
  Loader2,
  Search,
  FileText,
  BarChart3,
} from "lucide-react";
import { getPlagiats } from "../../api"; // à créer dans api.ts
import { seedPlagiats, type Plagiat } from "../../types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Plagiats() {
  const [plagiats, setPlagiats] = useState<Plagiat[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Recherche / filtre / pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [filterAuteur, setFilterAuteur] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getPlagiats();
        setPlagiats(data.length > 0 ? data : seedPlagiats);
      } catch (err) {
        setPlagiats(seedPlagiats);
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Liste unique des auteurs
  const auteurs = Array.from(
    new Set(plagiats.map((p) => p.auteur).filter((a) => a && a.trim() !== ""))
  );

  // Filtrage
  const filteredPlagiats = plagiats.filter((p) => {
    const matchesSearch =
      p.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.auteur || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAuteur = filterAuteur ? p.auteur === filterAuteur : true;
    return matchesSearch && matchesAuteur;
  });

  // Pagination
  const totalPages = Math.ceil(filteredPlagiats.length / itemsPerPage);
  const paginatedPlagiats = filteredPlagiats.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Données pour histogramme (distribution des scores IA)
  const chartData = [
    {
      range: "0 - 0.3",
      count: plagiats.filter((p) => p.score_ia && p.score_ia < 0.3).length,
    },
    {
      range: "0.3 - 0.6",
      count: plagiats.filter(
        (p) => p.score_ia && p.score_ia >= 0.3 && p.score_ia < 0.6
      ).length,
    },
    {
      range: "0.6 - 1.0",
      count: plagiats.filter((p) => p.score_ia && p.score_ia >= 0.6).length,
    },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-extrabold text-slate-900">
        Résultats Plagiats
      </h1>

      {/* Barre de recherche et filtre */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Rechercher par titre ou auteur..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#009639] focus:outline-none"
          />
        </div>
        <select
          value={filterAuteur}
          onChange={(e) => setFilterAuteur(e.target.value)}
          className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#009639] focus:outline-none"
        >
          <option value="">Tous les auteurs</option>
          {auteurs.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
      </div>

      {/* Tableau */}
      {!isLoading && (
        <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-slate-700">
              <thead>
                <tr className="bg-slate-100 text-slate-800">
                  <th className="px-4 py-3 text-left font-semibold">ID</th>
                  <th className="px-4 py-3 text-left font-semibold">Titre</th>
                  <th className="px-4 py-3 text-left font-semibold">Auteur</th>
                  <th className="px-4 py-3 text-left font-semibold">
                    IA détectée
                  </th>
                  <th className="px-4 py-3 text-left font-semibold">
                    Score IA
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {paginatedPlagiats.map((p) => (
                  <tr
                    key={p.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-4 py-3 font-mono text-xs text-slate-500">
                      {p.id}
                    </td>
                    <td className="px-4 py-3 font-medium">{p.titre}</td>
                    <td className="px-4 py-3">{p.auteur || "-"}</td>
                    <td className="px-4 py-3">{p.ia_detectee || "-"}</td>
                    <td className="px-4 py-3">{p.score_ia || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-slate-500">
              Page {currentPage} sur {totalPages}
            </p>
            <div className="flex gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="px-3 py-1 rounded-lg border border-slate-300 text-sm disabled:opacity-50"
              >
                Précédent
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="px-3 py-1 rounded-lg border border-slate-300 text-sm disabled:opacity-50"
              >
                Suivant
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Histogramme */}
      {!isLoading && !error && (
        <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#009639]" />
            Distribution des scores IA
          </h2>
          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#009639" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}

