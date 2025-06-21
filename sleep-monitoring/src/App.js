import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Riwayat from "./pages/Riwayat";
import Edukasi from "./pages/Edukasi";
import FAQ from "./pages/FAQ";
import Profil from "./pages/Profil";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Layout />}>
                <Route path="/home" element={<Home />} />
                <Route path="/riwayat" element={<Riwayat />} />
                <Route path="/edukasi" element={<Edukasi />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/profil" element={<Profil />} />
            </Route>
        </Routes>
    );
}

export default App;
