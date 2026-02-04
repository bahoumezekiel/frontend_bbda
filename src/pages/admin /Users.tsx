import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus, Search } from "lucide-react";
import { getUsers, addUser, updateUser, deleteUser } from "../../api";
import { seedUsers, type User } from "../../types";

export default function Users() {
const [users, setUsers] = useState<User[]>(seedUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [newUser, setNewUser] = useState<Omit<User, "id">>({
    name: "",
    email: "",
    role: "",
  });
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // LIST
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, []);

  // CREATE
  const handleAddUser = async () => {
    try {
      const created = await addUser(newUser);
      setUsers([...users, created]);
      setNewUser({ name: "", email: "", role: "" });
      setShowAddModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  // UPDATE
  const handleUpdateUser = async () => {
    if (!editingUser) return;
    try {
      const updated = await updateUser(editingUser);
      setUsers(users.map((u) => (u.id === updated.id ? updated : u)));
      setEditingUser(null);
      setShowEditModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  // DELETE
  const handleDeleteUser = async (id: number) => {
    try {
      await deleteUser(id);
      setUsers(users.filter((u) => u.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // Filtrage
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900">
          Gestion des Utilisateurs
        </h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#009639] text-white rounded-lg hover:bg-[#007a2f]"
        >
          <Plus className="w-4 h-4" /> Ajouter
        </button>
      </div>

      {/* Barre de recherche */}
      <div className="relative w-full md:w-1/3">
        <Search className="w-5 h-5 absolute left-3 top-3 text-slate-400" />
        <input
          type="text"
          placeholder="Rechercher par nom ou email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#009639] focus:outline-none"
        />
      </div>

      {/* Tableau */}
      <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6">
        <table className="min-w-full text-sm text-slate-700">
          <thead>
            <tr className="bg-slate-100 text-slate-800">
              <th className="px-4 py-3 text-left font-semibold">ID</th>
              <th className="px-4 py-3 text-left font-semibold">Nom</th>
              <th className="px-4 py-3 text-left font-semibold">Email</th>
              <th className="px-4 py-3 text-left font-semibold">Rôle</th>
              <th className="px-4 py-3 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {paginatedUsers.map((u) => (
              <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3 font-mono text-xs text-slate-500">
                  {u.id}
                </td>
                <td className="px-4 py-3 font-medium">{u.name}</td>
                <td className="px-4 py-3">{u.email}</td>
                <td className="px-4 py-3">{u.role}</td>
                <td className="px-4 py-3 flex gap-2">
                  <button
                    onClick={() => {
                      setEditingUser(u);
                      setShowEditModal(true);
                    }}
                    className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteUser(u.id)}
                    className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

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

      {/* Modal Ajout */}
      {showAddModal && (
        <div className="fixed inset-0 bg-white bg-opacity-40 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">
              Ajouter un utilisateur
            </h2>
            <input
              type="text"
              placeholder="Nom"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="w-full mb-3 px-3 py-2 border rounded-lg"
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              className="w-full mb-3 px-3 py-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Rôle"
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              className="w-full mb-3 px-3 py-2 border rounded-lg"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-slate-200 rounded-lg"
              >
                Annuler
              </button>
              <button
                onClick={handleAddUser}
                className="px-4 py-2 bg-[#009639] text-white rounded-lg"
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Modal Edition */}
      {showEditModal && editingUser && (
        <div className="fixed inset-0 bg-white bg-opacity-40 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">
              Modifier l’utilisateur
            </h2>
            <input
              type="text"
              value={editingUser.name}
              onChange={(e) =>
                setEditingUser({ ...editingUser, name: e.target.value })
              }
              className="w-full mb-3 px-3 py-2 border rounded-lg"
            />
            <input
              type="email"
              value={editingUser.email}
              onChange={(e) =>
                setEditingUser({ ...editingUser, email: e.target.value })
              }
              className="w-full mb-3 px-3 py-2 border rounded-lg"
            />
            <input
              type="text"
              value={editingUser.role}
              onChange={(e) =>
                setEditingUser({ ...editingUser, role: e.target.value })
              }
              className="w-full mb-3 px-3 py-2 border rounded-lg"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditingUser(null);
                }}
                className="px-4 py-2 bg-slate-200 rounded-lg"
              >
                Annuler
              </button>
              <button
                onClick={handleUpdateUser}
                className="px-4 py-2 bg-[#009639] text-white rounded-lg"
              >
                Sauvegarder
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
