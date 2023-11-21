const express = require("express");
const auth = require("../middleware/authMiddleware");
const router = express.Router();
const jsonParser = express.json();

const AunthController = require("../controllers/authController");

router.post("/register", jsonParser, AunthController.register);
router.post("/login", jsonParser, AunthController.login);
router.post("/logout", auth, AunthController.logout);
router.get("/current", auth, AunthController.current);

module.exports = router;
