const express = require("express");
const AuthController = require("../controllers/auth");
const auth = require("../middleware/auth");
const router = express.Router();
const jsonParser = express.json();

router.post("/register", jsonParser, AuthController.register);
router.post("/login", jsonParser, AuthController.login);
router.post("/logout", auth, AuthController.logout);

module.exports = router;
