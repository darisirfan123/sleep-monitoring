const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res
            .status(401)
            .json({ message: "Akses ditolak. Token tidak ada." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // berisi id, email, name
        next();
    } catch (err) {
        return res.status(403).json({ message: "Token tidak valid!" });
    }
};

module.exports = verifyToken;
