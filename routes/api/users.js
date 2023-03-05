const express = require("express");

const router = express.Router();

const { controllerWrapper } = require('../../helpers');
const {registrationController} = require('../../controllers');


router.post("/signup", controllerWrapper(registrationController));

module.exports = router;