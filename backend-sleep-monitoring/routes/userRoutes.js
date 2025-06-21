const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/:userId", authMiddleware, userController.getProfile);

router.put("/:userId/main", authMiddleware, userController.updateMainProfile);

router.put(
    "/:userId/detail",
    authMiddleware,
    userController.updateDetailProfile
);

module.exports = router;
