import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
            <div className="container">
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#mainNavbar"
                    aria-controls="mainNavbar"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="mainNavbar">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/home">
                                AKTIVITAS
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/riwayat">
                                RIWAYAT
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/edukasi">
                                EDUKASI
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/faq">
                                FAQ
                            </Link>
                        </li>
                    </ul>

                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
                        <li className="nav-item">
                            <Link className="nav-link" to="/profil">
                                Profil
                            </Link>
                        </li>
                        <li className="nav-item">
                            <button
                                className="btn btn-outline-danger btn-sm"
                                onClick={handleLogout}
                            >
                                LOGOUT
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;
