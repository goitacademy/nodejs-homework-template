const express = require("express");

const router = express.Router();
const jsonParser = express.json();

const AunthController = require("../controllers/authController");

router.post("/user/register", jsonParser, AunthController.register);

module.exports = router;
