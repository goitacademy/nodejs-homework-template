const express = require("express");
const authController = require("../../controllers/auth");
const authMiddleware = require("../../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", authController.registerUser);

router.post("/login", authController.loginUser);

router.post("/logout", authMiddleware, authController.logout);

router.get("/current", authMiddleware, authController.currentUser);

router.patch("/", authMiddleware, authController.updateSub);

module.exports = router;
