const express = require("express");

const { signup } = require("../../controllers");

const { isEmptyBody } = require("../../middlewares");

const { validateBody } = require("../../decorators");

const { userSignUpSchema, userSignInSchema } = require("../../models");

const userSignUpValidate = validateBody(userSignUpSchema);
const userSignInValidate = validateBody(userSignInSchema);

const authRouter = express.Router();

authRouter.post("/signup", isEmptyBody, userSignUpValidate, signup);

authRouter.post("/signin", isEmptyBody, userSignInValidate, signin);

module.exports = { authRouter };
