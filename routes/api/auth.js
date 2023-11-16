const express = require("express");
const router = express.Router();
const jsonParser = express.json();
const Ctrl = require('../../controllers/auth')

router.post("/register", jsonParser, Ctrl.register);

module.exports = router;
