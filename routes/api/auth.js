const express = require("express");

const { validateRegister } = require("../../middlewares");
const { register } = require("../../controllers");

const router = express.Router();

router.post("/register", validateRegister(), register);

module.exports = router;
