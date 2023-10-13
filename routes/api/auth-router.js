const express = require("express");

const authController = require("../../controllers/auth-controller");

const isEmptyBody = require("../../middlewares/isEmptyBody");
const validateBody = require("../../decorators/validateBody");

const { userSignupSchema, userSigninSchema } = require("../../models/User");

const userSignupValidate = validateBody(userSignupSchema);

const authRouter = express.Router();

authRouter.post(
  "/signup",
  isEmptyBody,
  userSignupValidate,
  authController.signup
);

module.exports = authRouter;
