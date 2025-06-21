const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = ({ name, email, password }) => {
    return new Promise((resolve, reject) => {
        db.query(
            "SELECT * FROM users WHERE email = ?",
            [email],
            (err, results) => {
                if (err)
                    return reject({ status: 500, message: "Server error" });
                if (results.length > 0)
                    return reject({
                        status: 400,
                        message: "Email sudah terdaftar",
                    });

                bcrypt.hash(password, 10, (err, hashedPassword) => {
                    if (err)
                        return reject({ status: 500, message: "Hash error" });

                    db.query(
                        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
                        [name, email, hashedPassword],
                        (err) => {
                            if (err)
                                return reject({
                                    status: 500,
                                    message: "Gagal mendaftar",
                                });

                            resolve({ message: "Berhasil daftar" });
                        }
                    );
                });
            }
        );
    });
};

const login = ({ email, password }) => {
    return new Promise((resolve, reject) => {
        db.query(
            "SELECT * FROM users WHERE email = ?",
            [email],
            (err, results) => {
                if (err)
                    return reject({ status: 500, message: "Server error" });
                if (results.length === 0)
                    return reject({
                        status: 400,
                        message: "Email tidak ditemukan",
                    });

                const user = results[0];
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err)
                        return reject({
                            status: 500,
                            message: "Compare error",
                        });
                    if (!isMatch)
                        return reject({
                            status: 400,
                            message: "Password salah",
                        });

                    const token = jwt.sign(
                        { id: user.id, name: user.name, email: user.email },
                        process.env.JWT_SECRET,
                        { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
                    );

                    resolve({
                        message: "Berhasil login",
                        user: {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                        },
                        token,
                    });
                });
            }
        );
    });
};

module.exports = { register, login };
