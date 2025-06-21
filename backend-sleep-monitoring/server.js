require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const sleepRoutes = require("./routes/sleepRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/api", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/sleep", sleepRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () =>
    console.log(`🚀 Server running on http://localhost:${PORT}`)
);
