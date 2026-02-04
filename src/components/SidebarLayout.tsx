import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  CopyCheck,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Settings,
  User,
 Users,
} from "lucide-react";

export default function SidebarLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside
        className={`flex flex-col justify-between bg-white border-r border-slate-200 shadow-sm transition-all duration-300 ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        {/* Top nav */}
        <div>
          <div className="flex items-center justify-between p-4">
            {!collapsed && (
              <span className="font-bold text-xl text-[#009639]">
                OeuvreGuard
              </span>
            )}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-2 rounded hover:bg-slate-100"
            >
              {collapsed ? (
                <ChevronRight className="w-5 h-5" />
              ) : (
                <ChevronLeft className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Navigation links */}
          <nav className="flex flex-col gap-1 mt-4">
            <Link
              to="/dashboard"
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                isActive("/dashboard")
                  ? "bg-[#009639] text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              {!collapsed && <span>Dashboard</span>}
            </Link>

            <Link
              to="/oeuvres"
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                isActive("/oeuvres")
                  ? "bg-[#009639] text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <FileText className="w-5 h-5" />
              {!collapsed && <span>Oeuvres</span>}
            </Link>

            <Link
              to="/plagiats"
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                isActive("/plagiats")
                  ? "bg-[#009639] text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <CopyCheck className="w-5 h-5" />
              {!collapsed && <span>Plagiats</span>}
            </Link>

            <Link
              to="/stats"
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                isActive("/stats")
                  ? "bg-[#009639] text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <BarChart3 className="w-5 h-5" />
              {!collapsed && <span>Stats</span>}
            </Link>
            <Link
              to="/users"
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                isActive("/users")
                  ? "bg-[#009639] text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Users className="w-5 h-5" />
              {!collapsed && <span>Users</span>}
            </Link>
          </nav>
        </div>

        {/* User info bottom */}
        <div className="border-t border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-slate-100">
              <User className="w-5 h-5 text-slate-600" />
            </div>
            {!collapsed && (
              <div className="flex-1">
                <p className="text-sm font-medium">Severin Dembele</p>
                <p className="text-xs text-slate-500">severin@email.com</p>
              </div>
            )}
          </div>
          <div
            className={`flex ${collapsed ? "flex-col" : "flex-row"} gap-2 mt-3`}
          >
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-100">
              <Settings className="w-4 h-4" />
              {!collapsed && <span>Paramètres</span>}
            </button>
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50">
              <LogOut className="w-4 h-4" />
              {!collapsed && <span>Déconnexion</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Contenu principal */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
}
