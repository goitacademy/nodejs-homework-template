const express = require("express");
const {
  userSignupSchema,
  userSigninSchema,
} = require("../../utils/userValidation");
const authController = require("../../controllers/auth-controller");
const validateBody = require("../../decorators/validateBody");
const authenticate = require("../../middlewares/authenticate");

const authRouter = express.Router();

const userSignupValidate = validateBody(userSignupSchema);
const userSigninValidate = validateBody(userSigninSchema);

authRouter.post("/users/register", userSignupValidate, authController.signup);
authRouter.post("/users/login", userSigninValidate, authController.signin);
authRouter.get("/users/current", authenticate, authController.getCurrent);
authRouter.post("/users/signout", authenticate, authController.signout);
authRouter.patch("/users", authenticate, authController.refresh);

module.exports = authRouter;
