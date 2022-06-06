const express = require("express");

const { validation, controllerWrapper } = require("../../middlewares");
const { signup: controllers } = require("../../controllers");
const { userSignupSchemaJoi } = require("../../models");

const router = express.Router();

router.post(
  "/signup",
  validation(userSignupSchemaJoi),
  controllerWrapper(controllers.signup)
);

module.exports = router;
