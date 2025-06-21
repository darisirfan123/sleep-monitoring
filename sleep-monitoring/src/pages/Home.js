import React, { useState } from "react";

function Home() {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    const [sleepTime, setSleepTime] = useState("");
    const [wakeTime, setWakeTime] = useState("");
    const [date, setDate] = useState("");
    const [dateExists, setDateExists] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [modalDate, setModalDate] = useState("");
    const [modalDuration, setModalDuration] = useState(0);
    const [modalCategory, setModalCategory] = useState("");
    const [modalAdvice, setModalAdvice] = useState({ text: "", source: "" });

    const sleepAdvices = [
        {
            text: "Hindari penggunaan gadget 30 menit sebelum tidur.",
            source: "Healthline 2024",
        },
        {
            text: "Lakukan peregangan ringan sebelum tidur.",
            source: "Sleep Foundation 2023",
        },
        {
            text: "Jaga suhu kamar agar tetap sejuk.",
            source: "National Sleep Association 2023",
        },
        {
            text: "Kurangi kafein minimal 6 jam sebelum tidur.",
            source: "Mayo Clinic 2024",
        },
        {
            text: "Mandi air hangat sebelum tidur dapat membantu rileks.",
            source: "BBC Health 2022",
        },
    ];

    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 10);

    const minDate = sevenDaysAgo.toISOString().split("T")[0];
    const maxDate = today.toISOString().split("T")[0];

    const getSleepCategory = (duration) => {
        if (duration < 3) return "Kurang tidur parah";
        if (duration < 5) return "Kurang tidur";
        if (duration < 7) return "Tidur cukup";
        if (duration <= 9) return "Tidur sehat";
        return "Kelebihan tidur";
    };

    const checkDateExists = async (selectedDate) => {
        try {
            const res = await fetch(
                `http://localhost:3001/api/sleep/check/${user.id}/${selectedDate}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const data = await res.json();
            setDateExists(res.ok && data.exists);
        } catch (err) {
            console.error("Gagal cek tanggal:", err);
            setDateExists(false);
        }
    };

    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        setDate(selectedDate);
        if (selectedDate) checkDateExists(selectedDate);
    };

    const getRandomAdvice = () => {
        const index = Math.floor(Math.random() * sleepAdvices.length);
        return sleepAdvices[index];
    };

    const handleSaveSleepData = async () => {
        const user_id = user.id;
        const sleepDateTime = new Date(`${date}T${sleepTime}`);
        let wakeDateTime = new Date(`${date}T${wakeTime}`);
        if (wakeDateTime <= sleepDateTime) {
            wakeDateTime.setDate(wakeDateTime.getDate() + 1);
        }

        const durationMs = wakeDateTime - sleepDateTime;
        const sleep_duration = durationMs / (1000 * 60 * 60);
        const category = getSleepCategory(sleep_duration);
        const advice = getRandomAdvice();

        const sleepData = {
            user_id,
            sleep_time: sleepTime,
            wake_time: wakeTime,
            date,
        };

        try {
            const token = localStorage.getItem("token");
            const res = await fetch("http://localhost:3001/api/sleep", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(sleepData),
            });

            const data = await res.json();

            if (res.ok) {
                setModalDate(date);
                setModalDuration(sleep_duration.toFixed(1));
                setModalCategory(category);
                setModalAdvice(advice);
                setShowModal(true);

                setSleepTime("");
                setWakeTime("");
                setDate("");
            } else {
                alert(data.message);
            }
        } catch (err) {
            console.error(err);
            alert("Gagal simpan data tidur!");
        }
    };

    return (
        <div>
            <div className="container text-center mt-5">
                <h2>Selamat datang di Sleep Monitoring!</h2>
                <p>Halo, {user?.name || "Pengguna"} 👋</p>
            </div>

            <div className="container mt-5">
                <div className="card shadow">
                    <div className="card-header bg-primary text-white">
                        <h4 className="mb-0">Aktivitas Tidur</h4>
                    </div>
                    <div className="card-body">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSaveSleepData();
                            }}
                        >
                            <div className="mb-3">
                                <label
                                    htmlFor="sleepTime"
                                    className="form-label"
                                >
                                    Waktu Tidur
                                </label>
                                <input
                                    type="time"
                                    id="sleepTime"
                                    className="form-control"
                                    value={sleepTime}
                                    onChange={(e) =>
                                        setSleepTime(e.target.value)
                                    }
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label
                                    htmlFor="wakeTime"
                                    className="form-label"
                                >
                                    Waktu Bangun
                                </label>
                                <input
                                    type="time"
                                    id="wakeTime"
                                    className="form-control"
                                    value={wakeTime}
                                    onChange={(e) =>
                                        setWakeTime(e.target.value)
                                    }
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="date" className="form-label">
                                    Tanggal
                                </label>
                                <input
                                    type="date"
                                    id="date"
                                    className="form-control"
                                    value={date}
                                    onChange={handleDateChange}
                                    min={minDate}
                                    max={maxDate}
                                    required
                                />
                                <div className="form-text">
                                    Pilih tanggal dari {minDate} sampai{" "}
                                    {maxDate}
                                </div>
                                {dateExists && (
                                    <div className="text-danger mt-1">
                                        Anda sudah mengisi data tidur di tanggal
                                        ini.
                                    </div>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="btn btn-success w-100"
                                disabled={dateExists}
                            >
                                Simpan Aktivitas
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* MODAL */}
            {showModal && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                        backgroundColor: "rgba(0,0,0,0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 9999,
                    }}
                    onClick={() => setShowModal(false)}
                >
                    <div
                        style={{
                            backgroundColor: "white",
                            padding: 30,
                            borderRadius: 10,
                            minWidth: 320,
                            maxWidth: 400,
                            textAlign: "center",
                            boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 style={{ color: "green", marginBottom: 20 }}>
                            ✨ Analisis Tidur
                        </h2>
                        <p style={{ fontSize: 18 }}>
                            Pada <b>{modalDate}</b> <br />
                            <br />
                            Waktu Tidur Anda: <b>{modalDuration} jam</b> <br />
                            <br />
                            Kategori Tidur: <b>{modalCategory}</b>
                        </p>
                        <p
                            style={{
                                marginTop: 20,
                                fontStyle: "italic",
                                fontSize: 16,
                                color: "#555",
                            }}
                        >
                            {modalAdvice.text}
                            <br />
                            <small>— {modalAdvice.source}</small>
                        </p>
                        <button
                            onClick={() => setShowModal(false)}
                            style={{
                                marginTop: 30,
                                padding: "10px 25px",
                                backgroundColor: "green",
                                color: "white",
                                border: "none",
                                borderRadius: 6,
                                cursor: "pointer",
                                fontWeight: "bold",
                                fontSize: 16,
                            }}
                        >
                            Tutup
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;
