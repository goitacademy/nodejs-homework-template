const express = require("express");

const { validation, authenticate } = require("../../middlewares");

const { schemas } = require("../../models/user");

const { auth: ctrl } = require('../../controllers');

const ctrlhWrapper = require("../../helpers/ctrlWrapper");

const authRouter = express.Router();

authRouter.post("/register", validation(schemas.registerSchema), ctrlhWrapper(ctrl.register));
authRouter.post("/login", validation(schemas.loginSchema), ctrlhWrapper(ctrl.login));
authRouter.get("/logout", authenticate, ctrlhWrapper(ctrl.logout));

module.exports = authRouter;