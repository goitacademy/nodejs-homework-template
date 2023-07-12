const { register, login, getCurrent, logout } = require("../../controller/index");
const { authenticate } = require("../../middlewares");

const express = require("express");

const router = express.Router();

router.post('/register', register);

router.post("/login", login);

router.get("/users/current", authenticate, getCurrent);

router.post("/logout", authenticate, logout);

module.exports = router;