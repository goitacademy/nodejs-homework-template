const express = require("express");
const router = express.Router();
const userAuth = require("../middleware/auth");
const { register, login, update, getCurrent, logout } = require("../auth/Auth");

router.post("/signup", register);
router.post("/login", login);
router.get("/current", userAuth, getCurrent);
router.post("/logout", userAuth, logout);
router.patch("/", userAuth, update);

module.exports = router;
