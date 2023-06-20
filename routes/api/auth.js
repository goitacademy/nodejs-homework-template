const express = require("express");

const { validateUser } = require("../../middlewares");
const { register, login } = require("../../controllers");

const router = express.Router();

router.post("/register", validateUser(), register);
router.post("/login", validateUser(), login);

module.exports = router;
