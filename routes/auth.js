const express = require("express");
const validateUser = require("../middleware/validation");
const { signup, login } = require("../controllers/authController");

const router = express.Router();

router.post("/signup", validateUser, signup);
router.post("/login", validateUser, login);

module.exports = router;
