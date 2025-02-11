const express = require("express");
const router = express.Router();
const { signup, login, logout, getCurrent } = require("../../controllers/auth");
const { validateUser } = require("../../middlewares/validation");
const auth = require("../../middlewares/auth");

router.post("/signup", validateUser, signup);

router.post("/login", validateUser, login);

router.get("/logout", auth, logout);

router.get("/current", auth, getCurrent);

module.exports = router;
