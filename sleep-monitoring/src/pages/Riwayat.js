import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
    Chart,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function Riwayat() {
    const [sleepData, setSleepData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedWeek, setSelectedWeek] = useState(1);
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        if (!user) return;

        const fetchSleepData = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await fetch(
                    `http://localhost:3001/api/sleep/${user.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = await res.json();
                if (res.ok) {
                    const sortedData = data.sort(
                        (a, b) => new Date(a.date) - new Date(b.date)
                    );
                    setSleepData(sortedData);
                } else {
                    alert(data.message || "Gagal mengambil data tidur");
                }
            } catch (err) {
                console.error(err);
                alert("Terjadi kesalahan saat mengambil data tidur");
            } finally {
                setLoading(false);
            }
        };

        fetchSleepData();
    }, [user]);

    // Generate daftar minggu (1-52)
    const currentYear = new Date().getFullYear();

    const getWeekStartEndDates = (weekNumber) => {
        const jan1 = new Date(currentYear, 0, 1);
        const dayOfJan1 = jan1.getDay();
        const dayOffset = dayOfJan1 === 0 ? -6 : 1 - dayOfJan1;

        const startOfFirstWeek = new Date(jan1);
        startOfFirstWeek.setDate(jan1.getDate() + dayOffset);

        const startOfWeek = new Date(startOfFirstWeek);
        startOfWeek.setDate(startOfFirstWeek.getDate() + (weekNumber - 1) * 7);

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);

        return { start: startOfWeek, end: endOfWeek };
    };

    // Filter sleepData sesuai minggu terpilih
    const { start, end } = getWeekStartEndDates(selectedWeek);

    const currentWeekData = sleepData.filter((item) => {
        const date = new Date(item.date);
        return date >= start && date <= end;
    });

    const dataChart = {
        labels: currentWeekData.map((d) => formatDate(d.date)),
        datasets: [
            {
                label: "Durasi Tidur (jam)",
                data: currentWeekData.map((d) =>
                    d.sleep_duration ? d.sleep_duration.toFixed(1) : 0
                ),
                fill: false,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.3,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: "top" },
            title: {
                display: true,
                text: `Durasi Tidur Minggu ke-${selectedWeek}`,
            },
        },
        // Jika data sedikit, chart tetap rapi
        scales: {
            x: {
                title: { display: true, text: "Tanggal" },
            },
            y: {
                beginAtZero: true,
                title: { display: true, text: "Durasi (jam)" },
            },
        },
    };

    const handleWeekChange = (e) => {
        setSelectedWeek(Number(e.target.value));
    };

    if (loading) {
        return <div>Loading data riwayat tidur...</div>;
    }

    return (
        <div className="container mt-4">
            <h2>Riwayat Aktivitas Tidur</h2>

            {/* Pilih Minggu */}
            <div className="my-3">
                <label htmlFor="weekSelect" className="form-label">
                    Pilih Minggu
                </label>
                <select
                    id="weekSelect"
                    className="form-select"
                    value={selectedWeek}
                    onChange={handleWeekChange}
                >
                    {Array.from({ length: 52 }, (_, i) => {
                        const weekNumber = i + 1;
                        const { start, end } = getWeekStartEndDates(weekNumber);
                        return (
                            <option key={i} value={weekNumber}>
                                {`Minggu ke-${weekNumber} (${formatDate(
                                    start.toISOString()
                                )} - ${formatDate(end.toISOString())})`}
                            </option>
                        );
                    })}
                </select>
            </div>

            {/* Info data */}
            <div className="alert alert-info">
                Minggu ke-{selectedWeek}: {currentWeekData.length} data tidur
                tercatat
            </div>

            {/* Chart */}
            {currentWeekData.length > 0 ? (
                <div className="my-4">
                    <Line data={dataChart} options={options} />
                </div>
            ) : (
                <div className="text-muted">
                    Tidak ada data tidur minggu ini.
                </div>
            )}

            {/* Tabel */}
            {currentWeekData.length > 0 && (
                <table className="table table-bordered mt-3">
                    <thead>
                        <tr>
                            <th>Tanggal</th>
                            <th>Waktu Tidur</th>
                            <th>Waktu Bangun</th>
                            <th>Durasi (jam)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentWeekData.map((item, i) => (
                            <tr key={i}>
                                <td>{formatDate(item.date)}</td>
                                <td>
                                    {item.sleep_time
                                        ? formatTime(item.sleep_time)
                                        : "-"}
                                </td>
                                <td>
                                    {item.wake_time
                                        ? formatTime(item.wake_time)
                                        : "-"}
                                </td>
                                <td>{item.sleep_duration.toFixed(1)} jam</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

// Format tanggal ke DD-MM-YYYY
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
};

// Format waktu ke HH:MM
const formatTime = (timeString) => {
    const date = new Date(`1970-01-01T${timeString}Z`);
    return date.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "UTC",
    });
};

export default Riwayat;
