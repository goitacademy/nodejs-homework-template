const express = require("express");
const router = express.Router();
const jsonParser = express.json();
<<<<<<< Updated upstream
const Ctrl = require('../../controllers/auth');
const auth = require("../../middleware/user")

router.post("/register", jsonParser, Ctrl.register);
router.post("/login", jsonParser, Ctrl.login);
router.post("/logout", auth, Ctrl.logout);
router.get("/current", auth, Ctrl.current)
=======
const Ctrl = require("../../controllers/auth");

router.post("/register", jsonParser, Ctrl.register);
>>>>>>> Stashed changes

module.exports = router;
