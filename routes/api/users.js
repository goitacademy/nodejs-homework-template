const express = require("express");
const router = express.Router();

const { users: ctrl } = require("../../controllers");

router.post("/register", ctrl.register);

router.post("/login", ctrl.login);

module.exports = router;
