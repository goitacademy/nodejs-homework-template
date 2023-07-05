const express = require("express");
const router = express.Router();
const { register, login, update } = require("../auth/Auth");

router.post("/register", register);
router.post("/login", login);
router.post("/update", update);

module.exports = router;
