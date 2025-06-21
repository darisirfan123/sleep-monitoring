const mysql = require("mysql2");
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "sleep_monitoring",
});
db.query("SELECT id, name, email FROM users WHERE id = ?", [1], (err, res) => {
    if (err) console.error("err:", err);
    else console.log("res:", res);
});
