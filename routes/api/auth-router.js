const express = require('express');

const authController = require('../../controllers/auth-controller');

const userSchemas = require('../../models/User');

const { validateBody } = require('../../decorators/index');

const authRouter = express.Router();

const userSignupValidate = validateBody(userSchemas.userSignupSchema);
const userSigninValidate = validateBody(userSchemas.userSigninSchema);

authRouter.post("/signup", userSignupValidate, authController.signup);

authRouter.post("/signin", userSigninValidate, authController.signin);

module.exports = authRouter;