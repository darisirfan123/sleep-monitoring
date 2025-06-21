const db = require("../config/db");

exports.getProfile = (userId) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT u.id, u.name, u.email, d.weight, d.height, d.age, d.gender
            FROM users u
            LEFT JOIN user_details d ON u.id = d.user_id
            WHERE u.id = ?
        `;
        db.query(query, [userId], (err, results) => {
            if (err) return reject({ message: "Server error", status: 500 });
            if (results.length === 0)
                return reject({ message: "User tidak ditemukan", status: 404 });
            resolve(results[0]);
        });
    });
};

exports.updateMainProfile = (userId, name) => {
    return new Promise((resolve, reject) => {
        db.query(
            "UPDATE users SET name = ? WHERE id = ?",
            [name, userId],
            (err) => {
                if (err)
                    return reject({ message: "Server error", status: 500 });
                resolve("Profil utama berhasil diperbarui");
            }
        );
    });
};

exports.updateDetailProfile = (userId, { weight, height, age, gender }) => {
    return new Promise((resolve, reject) => {
        db.query(
            "SELECT * FROM user_details WHERE user_id = ?",
            [userId],
            (err, results) => {
                if (err)
                    return reject({ message: "Server error", status: 500 });

                if (results.length === 0) {
                    // Insert
                    db.query(
                        "INSERT INTO user_details (user_id, weight, height, age, gender) VALUES (?, ?, ?, ?, ?)",
                        [userId, weight, height, age, gender],
                        (err2) => {
                            if (err2)
                                return reject({
                                    message: "Server error",
                                    status: 500,
                                });
                            resolve("Detail profil berhasil dibuat!");
                        }
                    );
                } else {
                    // Update
                    db.query(
                        "UPDATE user_details SET weight = ?, height = ?, age = ?, gender = ? WHERE user_id = ?",
                        [weight, height, age, gender, userId],
                        (err2) => {
                            if (err2)
                                return reject({
                                    message: "Server error",
                                    status: 500,
                                });
                            resolve("Detail profil berhasil diperbarui!");
                        }
                    );
                }
            }
        );
    });
};
