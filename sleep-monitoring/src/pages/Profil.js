import React, { useState, useEffect } from "react";
import axios from "axios";

function Profil() {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    const userId = storedUser?.id;

    const [activeMenu, setActiveMenu] = useState("utama");

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");

    // Ambil data user saat komponen dimuat
    useEffect(() => {
        if (userId && token) {
            axios
                .get(`http://localhost:3001/api/users/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    const data = res.data;
                    setName(data.name || "");
                    setEmail(data.email || "");
                    setWeight(data.weight || "");
                    setHeight(data.height || "");
                    setAge(data.age || "");
                    setGender(data.gender || "");
                })
                .catch((err) => {
                    console.error("Gagal ambil profil:", err);
                    alert("Gagal mengambil data profil. Silakan login ulang.");
                });
        }
    }, [userId, token]);

    const handleSaveUtama = (e) => {
        e.preventDefault();
        axios
            .put(
                `http://localhost:3001/api/users/${userId}/main`,
                { name },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((res) => alert(res.data.message))
            .catch((err) => {
                console.error("Gagal update nama:", err);
                alert("Gagal menyimpan perubahan");
            });
    };

    const handleSaveDetail = (e) => {
        e.preventDefault();
        axios
            .put(
                `http://localhost:3001/api/users/${userId}/detail`,
                { weight, height, age, gender },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((res) => alert(res.data.message))
            .catch((err) => {
                console.error("Gagal update detail:", err);
                alert("Gagal menyimpan detail");
            });
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-3">
                    <div className="list-group">
                        <button
                            className={`list-group-item list-group-item-action ${
                                activeMenu === "utama" ? "active" : ""
                            }`}
                            onClick={() => setActiveMenu("utama")}
                        >
                            Menu Utama
                        </button>
                        <button
                            className={`list-group-item list-group-item-action ${
                                activeMenu === "detail" ? "active" : ""
                            }`}
                            onClick={() => setActiveMenu("detail")}
                        >
                            Detail
                        </button>
                    </div>
                </div>

                <div className="col-md-9">
                    <h2 className="mb-4 text-center">Profil</h2>

                    {activeMenu === "utama" && (
                        <form
                            onSubmit={handleSaveUtama}
                            className="card shadow p-4"
                        >
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">
                                    Nama
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className="form-control"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="form-control"
                                    value={email}
                                    disabled
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary w-100"
                            >
                                Simpan Perubahan
                            </button>
                        </form>
                    )}

                    {activeMenu === "detail" && (
                        <form
                            onSubmit={handleSaveDetail}
                            className="card shadow p-4"
                        >
                            <div className="mb-3">
                                <label htmlFor="weight" className="form-label">
                                    Berat Badan (kg)
                                </label>
                                <input
                                    type="number"
                                    id="weight"
                                    className="form-control"
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                    min="0"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="height" className="form-label">
                                    Tinggi Badan (cm)
                                </label>
                                <input
                                    type="number"
                                    id="height"
                                    className="form-control"
                                    value={height}
                                    onChange={(e) => setHeight(e.target.value)}
                                    min="0"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="age" className="form-label">
                                    Usia (tahun)
                                </label>
                                <input
                                    type="number"
                                    id="age"
                                    className="form-control"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                    min="0"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="gender" className="form-label">
                                    Kelamin
                                </label>
                                <select
                                    id="gender"
                                    className="form-select"
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                >
                                    <option value="">Pilih Kelamin</option>
                                    <option value="Laki-laki">Laki-laki</option>
                                    <option value="Perempuan">Perempuan</option>
                                </select>
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary w-100"
                            >
                                Simpan Detail
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Profil;
