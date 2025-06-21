const db = require("../config/db");

exports.createSleepData = ({ user_id, sleep_time, wake_time, date }) => {
    return new Promise((resolve, reject) => {
        if (
            !user_id ||
            !sleep_time.trim() ||
            !wake_time.trim() ||
            !date.trim()
        ) {
            return reject({
                status: 400,
                message: "Data tidur tidak lengkap!",
            });
        }

        const sleepDateTime = new Date(`${date}T${sleep_time}`);
        let wakeDateTime = new Date(`${date}T${wake_time}`);
        if (wakeDateTime <= sleepDateTime) {
            wakeDateTime.setDate(wakeDateTime.getDate() + 1);
        }

        const durationMs = wakeDateTime - sleepDateTime;
        const sleep_duration = durationMs / (1000 * 60 * 60); // jam

        db.query(
            "SELECT id FROM sleep_data WHERE user_id = ? AND date = ?",
            [user_id, date],
            (err, results) => {
                if (err)
                    return reject({
                        status: 500,
                        message: "Gagal memeriksa data tidur!",
                    });
                if (results.length > 0)
                    return reject({
                        status: 400,
                        message: "Data tidur untuk tanggal ini sudah ada!",
                    });

                db.query(
                    "INSERT INTO sleep_data (user_id, sleep_time, wake_time, date, sleep_duration) VALUES (?, ?, ?, ?, ?)",
                    [user_id, sleep_time, wake_time, date, sleep_duration],
                    (err2) => {
                        if (err2)
                            return reject({
                                status: 500,
                                message: "Gagal menyimpan data tidur!",
                            });
                        resolve({ message: "Data tidur berhasil disimpan!" });
                    }
                );
            }
        );
    });
};

exports.getSleepRecordsByUser = (userId) => {
    return new Promise((resolve, reject) => {
        db.query(
            "SELECT * FROM sleep_data WHERE user_id = ? ORDER BY date DESC",
            [userId],
            (err, results) => {
                if (err)
                    return reject(new Error("Gagal mengambil data tidur!"));
                resolve(results);
            }
        );
    });
};

exports.checkSleepDataExists = (user_id, date) => {
    return new Promise((resolve, reject) => {
        db.query(
            "SELECT id FROM sleep_data WHERE user_id = ? AND date = ?",
            [user_id, date],
            (err, rows) => {
                if (err)
                    return reject(new Error("Gagal memeriksa data tidur!"));
                resolve(rows.length > 0);
            }
        );
    });
};
