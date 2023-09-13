const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const { login, logout, signup } = authController;

router.post("/users/login", login);
router.post("/users/logout", logout);
router.post("/users/signup", signup);

module.exports = router;
