const express = require("express");
const authRouter = express.Router();

const { userSignUpSchema } = require("../../schemas");
const { validation, isAmptyBody } = require("../../middlewares");
const validateMiddleWare = validation(userSignUpSchema);
const ctrl = require("../../controllers/auth/auth-controllers");

authRouter.post("/register", isAmptyBody, validateMiddleWare, ctrl.signup);

module.exports = authRouter;
