const express = require("express");
const router = express.Router();

const { loginController } = require("../controllers/authController");

router.get("/", loginController);

module.exports = router;
