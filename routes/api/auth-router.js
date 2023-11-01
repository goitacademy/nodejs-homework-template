const express = require("express");

const { signup } = require("../../controllers");

const { isEmptyBody } = require("../../middlewares");

const { validateBody } = require("../../decorators");

const { userSignUpSchema, userSignInSchema } = require("../../models");
const authController = require("../../controllers/auth/auth-controller");

const userSignUpValidate = validateBody(userSignUpSchema);
const userSignInValidate = validateBody(userSignInSchema);

const authRouter = express.Router();

authRouter.post(
  "/signup",
  isEmptyBody,
  /*userSignInValidate,*/
  authController.signup
);

module.exports = { authRouter };
