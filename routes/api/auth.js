const express = require("express");
const router = express.Router();
const jsonParser = express.json();
const Ctrl = require('../../controllers/auth');
const auth = require("../../middleware/user")
const isValidId = require("../../middleware/validationBody")

router.post("/register",isValidId, jsonParser, Ctrl.register);
router.post("/login", isValidId, jsonParser, Ctrl.login);
router.post("/logout", auth, Ctrl.logout);
router.get("/current", auth, Ctrl.current)

module.exports = router;
