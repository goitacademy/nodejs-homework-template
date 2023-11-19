const express = require("express");
const auth = require("../middleware/authMiddleware");
const router = express.Router();
const jsonParser = express.json();

const AunthController = require("../controllers/authController");

router.post("/user/register", jsonParser, AunthController.register);
router.post("/user/login", jsonParser, AunthController.login);
router.post("/user/logout", auth, AunthController.logout);

module.exports = router;
