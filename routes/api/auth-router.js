const { Router } = require("express");

const authController = require("../../controllers/auth-controller");

const isEmptyBody = require("../../middlewares/isEmptyBody");
const authenticate = require("../../middlewares/authenticate");
const validateBody = require("../../decorators/validateBody.js");

const { userSignupSchema, userSigninSchema } = require("../../models/User");

const userSignupValidate = validateBody(userSignupSchema);
const userSigninValidate = validateBody(userSigninSchema);

const authRouter = Router();

authRouter.post(
  "/users/register",
  isEmptyBody,
  userSignupValidate,
  authController.signup
);

authRouter.post(
  "/users/login",
  isEmptyBody,
  userSigninValidate,
  authController.signin
);

authRouter.get("/users/current", authenticate, authController.getCurrent);

authRouter.post("/users/logout", authenticate, authController.signOut);

module.exports = authRouter;
