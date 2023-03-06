const express = require("express");

const ctrl = require("../../controllers/auth");

const ctrlhWrapper = require("../../helpers/ctrlWrapper");
const  userSchemas = require("../../schemas/userSchema");
const { validation, authenticate } = require("../../middlewares");

const authRouter = express.Router();

authRouter.post("/register", validation(userSchemas.singUpSchema), ctrlhWrapper(ctrl.register));

authRouter.post("/login", validation(userSchemas.singInSchema), ctrlhWrapper(ctrl.login));
authRouter.get("/logout", authenticate, ctrlhWrapper(ctrl.logout));

module.exports = { authRouter };