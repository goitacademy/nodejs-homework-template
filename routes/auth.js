const express = require("express");

const AuthContriller = require("../controllers/auth");

const router = express.Router();

const jsonParser = express.json();

router.post("/register", jsonParser, AuthContriller.register);

router.post("/login", jsonParser, AuthContriller.login)

module.exports = router;
