const express = require("express");

const AuthController = require("../../controllers/users");
const auth = require("../../middleware/users");


const router = express.Router();
const jsonParser = express.json();

router.post("/register", jsonParser, AuthController.register);
router.post("/login", jsonParser, AuthController.login);
router.get("/logout", auth, AuthController.logout);

module.exports = router;