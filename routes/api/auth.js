const express = require("express");
const router = express.Router();
const AuthControllers = require("../../controllers/auth");
const jsonParser = express.json();

router.post("/register",jsonParser, AuthControllers.register);
router.post("/login", jsonParser, AuthControllers.login)
module.exports = router;
