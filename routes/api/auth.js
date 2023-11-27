const express = require("express");
const router = express.Router();
const jsonParser = express.json();
const Ctrl = require('../../controllers/auth');
const auth = require("../../middleware/user")

router.post("/register", jsonParser, Ctrl.register);
router.post("/login", jsonParser, Ctrl.login);
router.post("/logout", auth, Ctrl.logout);
router.get("/current", auth, Ctrl.current)

module.exports = router;