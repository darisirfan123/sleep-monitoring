import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeInUp, buttonHover } from "../MotionVariants"; // Import style motion

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:3001/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                navigate("/");
            } else {
                setError(data.message || "Registrasi gagal");
            }
        } catch (err) {
            setError("Terjadi kesalahan server");
        }
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                padding: "20px",
                backgroundColor: "#f8f9fa",
            }}
        >
            <motion.div
                className="container"
                style={{ maxWidth: "960px" }}
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                transition={fadeInUp.transition}
            >
                <div className="row shadow rounded overflow-hidden bg-white align-items-center">
                    <div className="col-md-6 d-none d-md-block p-0">
                        <img
                            src="/sleep_reg_image.png"
                            alt="Register visual"
                            className="img-fluid"
                        />
                    </div>

                    <div className="col-md-6 p-5">
                        <h3 className="mb-4 text-center">Daftar Akun Baru</h3>

                        {error && (
                            <motion.div
                                className="alert alert-danger"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {error}
                            </motion.div>
                        )}

                        <form onSubmit={handleRegister}>
                            <div className="mb-3">
                                <label className="form-label">Nama</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                />
                            </div>

                            <motion.button
                                {...buttonHover}
                                type="submit"
                                className="btn btn-primary w-100"
                            >
                                DAFTAR
                            </motion.button>
                        </form>

                        <p className="mt-3 text-center">
                            Sudah punya akun? <Link to="/">Masuk di sini</Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default Register;
