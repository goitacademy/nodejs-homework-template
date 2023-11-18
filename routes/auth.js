const express = require("express");

const AuthController = require("../controllers/auth");

const auth = require("../middleware/auth");

const router = express.Router();

const jsonParser = express.json();

router.post("/register", jsonParser, AuthContriller.register);

router.post("/login", jsonParser, AuthContriller.login)

router.post("/logout", auth, AuthContriller.logout)

module.exports = router;
