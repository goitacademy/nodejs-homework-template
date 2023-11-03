const express = require("express");

const { signup, signin } = require("../../controllers");

const { isEmptyBody, authenticate } = require("../../middlewares");

const { validateBody } = require("../../decorators");

const { userSignUpSchema, userSignInSchema } = require("../../models");

const userSignUpValidate = validateBody(userSignUpSchema);
const userSignInValidate = validateBody(userSignInSchema);

const authRouter = express.Router();

authRouter.post("/signup", isEmptyBody, userSignUpValidate, signup);

authRouter.post("/signin", isEmptyBody, userSignInValidate, signin);

authRouter.get("/current", authenticate, getCurrent);

module.exports = { authRouter };
