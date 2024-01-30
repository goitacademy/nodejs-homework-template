const express = require("express");
const authControllers = require("../../controllers/auth");
const authMiddleware = require("../../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", authControllers.registerUser);

router.post("/login", authControllers.loginUser);

router.post("/logout", authMiddleware, authControllers.logout);

router.get("/current", authMiddleware, authControllers.currentUser);

router.patch("/", authMiddleware, authControllers.updateSub);

module.exports = router;
