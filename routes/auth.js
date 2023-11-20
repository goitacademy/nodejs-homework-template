const express = require("express");
const auth = require("../middleware/authMiddleware");
const router = express.Router();
const jsonParser = express.json();

const AunthController = require("../controllers/authController");

router.post("/users/register", jsonParser, AunthController.register);
router.post("/users/login", jsonParser, AunthController.login);
router.post("/users/logout", auth, AunthController.logout);
router.get("/users/current", auth, AunthController.current);

module.exports = router;
