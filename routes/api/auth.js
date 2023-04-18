const express = require("express");
const controllers = require("../../controllers/authControllers");

const { validationRegister } = require("../../middlewares/validate");

const router = express.Router();

router.post("/register", validationRegister, controllers.registerUser);

router.post("/login");

module.exports = router;
