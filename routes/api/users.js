const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middlewares/authMiddleware.js");
const { signup, login, logout, current } = require("../../controllers/users");

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", authMiddleware, logout);
router.get("/current", authMiddleware, current );

module.exports = router;
