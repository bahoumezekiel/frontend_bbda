import { useEffect, useState } from "react";
import { AlertCircle, Loader2, BarChart3, FileText, Music, Search } from "lucide-react";
import { getOeuvres } from "../../api";
import { seedOeuvres, type Oeuvre } from "../../types";

export default function Dashboard() {
  const [oeuvres, setOeuvres] = useState<Oeuvre[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Recherche / filtre / pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getOeuvres();
        setOeuvres(data.length > 0 ? data : seedOeuvres);
      } catch (err) {
        setOeuvres(seedOeuvres);
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filtrage
  const filteredOeuvres = oeuvres.filter((o) => {
    const matchesSearch =
      o.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.auteur.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType ? o.type_oeuvre === filterType : true;
    return matchesSearch && matchesType;
  });

  // Pagination
  const totalPages = Math.ceil(filteredOeuvres.length / itemsPerPage);
  const paginatedOeuvres = filteredOeuvres.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-slate-900">
          Dashboard des Œuvres
        </h1>
      </div>

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
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#009639] focus:outline-none"
        >
          <option value="">Tous les types</option>
          <option value="Musique">Musique</option>
          <option value="Texte">Texte</option>
        </select>
      </div>

      {/* Error */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 animate-shake">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Loading */}
      {isLoading && (
        <div className="flex items-center justify-center py-10 text-slate-600">
          <Loader2 className="w-6 h-6 animate-spin mr-2" />
          Chargement des données...
        </div>
      )}

      {/* Tableau */}
      {!isLoading && (
        <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6">
          <h2 className="text-lg font-semibold mb-4">Liste des œuvres</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-slate-700">
              <thead>
                <tr className="bg-slate-100 text-slate-800">
                  <th className="px-4 py-3 text-left font-semibold">ID</th>
                  <th className="px-4 py-3 text-left font-semibold">Type</th>
                  <th className="px-4 py-3 text-left font-semibold">Titre</th>
                  <th className="px-4 py-3 text-left font-semibold">Auteur</th>
                  <th className="px-4 py-3 text-left font-semibold">Genre</th>
                  <th className="px-4 py-3 text-left font-semibold">Langue</th>
                  <th className="px-4 py-3 text-left font-semibold">Fichier</th>
                  <th className="px-4 py-3 text-left font-semibold">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {paginatedOeuvres.map((o) => (
                  <tr
                    key={o.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-4 py-3 font-mono text-xs text-slate-500">
                      {o.id}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          o.type_oeuvre === "Musique"
                            ? "bg-green-100 text-green-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {o.type_oeuvre}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-medium">{o.titre}</td>
                    <td className="px-4 py-3">{o.auteur || "-"}</td>
                    <td className="px-4 py-3">{o.genre || "-"}</td>
                    <td className="px-4 py-3">{o.langue || "-"}</td>
                    <td className="px-4 py-3 text-slate-500">
                      {o.fichier_nom}
                    </td>
                    <td className="px-4 py-3 text-slate-500">
                      {o.date_enregistrement}
                    </td>
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
      {/* Statistiques */}
      {!isLoading && !error && (
        <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#009639]" />
            Statistiques
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-100 rounded-lg text-center">
              <p className="text-sm text-slate-500">Total des œuvres</p>
              <p className="text-2xl font-bold">{oeuvres.length}</p>
            </div>
            <div className="p-4 bg-slate-100 rounded-lg text-center">
              <p className="text-sm text-slate-500 flex items-center justify-center gap-1">
                <Music className="w-4 h-4 text-slate-600" /> Musique
              </p>
              <p className="text-2xl font-bold">
                {oeuvres.filter((o) => o.type_oeuvre === "Musique").length}
              </p>
            </div>
            <div className="p-4 bg-slate-100 rounded-lg text-center">
              <p className="text-sm text-slate-500 flex items-center justify-center gap-1">
                <FileText className="w-4 h-4 text-slate-600" /> Texte
              </p>
              <p className="text-2xl font-bold">
                {oeuvres.filter((o) => o.type_oeuvre === "Texte").length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
