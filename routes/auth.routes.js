const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const auth = require("../middlewares/auth");
const { login, logout, signup, current } = authController;

router.post("/users/login", login);
router.get("/users/logout", auth, logout);
router.post("/users/signup", signup);
router.get('/users/current', auth, current)

module.exports = router;
