const express = require("express");

const { users: ctrl } = require("../../controllers/index");

const router = express.Router();

router.post("/register", ctrl.register);

module.exports = router;
