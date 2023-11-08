const express = require("express");
const router = express.Router();
const { signup, login, logout, getCurrentUser } = require("../controllers/users");
const checkToken = require("../middleware/auth");

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", checkToken, logout);
router.get("/current", checkToken, getCurrentUser);

module.exports = router;
