const express = require('express');
const router = express.Router();

const { register, login, getCurrent, logout, updateSubscription } = require("../../controllers/auth")
const {authenticate} = require("../../middlewares")

router.post("/register", register);

router.post("/login", login);

router.get("/current", authenticate, getCurrent);

router.post("/logout", authenticate, logout);

router.patch("/users", authenticate, updateSubscription)

module.exports = router;