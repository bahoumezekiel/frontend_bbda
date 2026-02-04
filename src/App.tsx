import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Plagiat from "./pages/Plagiat";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import SidebarLayout from "./components/SidebarLayout";
import Dashboard from "./pages/admin/Dashboard";
import Oeuvres from "./pages/admin/Oeuvres";
import Plagiats from "./pages/admin/Plagiats";
import Stats from "./pages/admin/Stats";
import Users from "./pages/admin/Users";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/plagiat" element={<Plagiat />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            {/* Routes avec sidebar */}
            <Route element={<SidebarLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/oeuvres" element={<Oeuvres />} />
              <Route path="/plagiats" element={<Plagiats />} />
              <Route path="/stats" element={<Stats />} />
              <Route path="/users" element={<Users />} />
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
