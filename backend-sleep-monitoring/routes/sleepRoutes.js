const express = require("express");
const router = express.Router();
const sleepController = require("../controllers/sleepController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, sleepController.createSleepData);
router.get("/:userId", authMiddleware, sleepController.getSleepRecordsByUser);

module.exports = router;
