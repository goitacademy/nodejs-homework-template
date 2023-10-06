const express = require("express");
const router = express.Router();
const { register, login } = require("../../controllers/authCtrl");

router.post("/register", register);

router.post("/login", login);

router.post("/logout");

router.post("/current");

module.exports = router;
