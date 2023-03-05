const express = require("express");

const router = express.Router();

const { controllerWrapper } = require('../../helpers');
const {registrationController, loginController} = require('../../controllers');


router.post("/signup", controllerWrapper(registrationController));
router.post("/login", controllerWrapper(loginController));

module.exports = router;