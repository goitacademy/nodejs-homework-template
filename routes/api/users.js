const express = require("express");

const {
  validation,
  controllerWrapper,
  signupUser,
} = require("../../middlewares");
const { signup: controllers } = require("../../controllers");
const { userSignupSchemaJoi } = require("../../models");

const router = express.Router();

router.post(
  "/signup",
  validation(userSignupSchemaJoi),
  controllerWrapper(controllers.signup)
);

router.post(
  "/login",
  validation(userSignupSchemaJoi),
  controllerWrapper(controllers.login)
);

router.get("/current", signupUser, controllerWrapper(controllers.getCurrent));

module.exports = router;
