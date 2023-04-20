const express = require("express");

const { auth: ctrl } = require("../../controllers");
const { validateBody } = require("../../utils");
const { userJoiSchema } = require("../../models");
const { authenticate } = require("../../middlewares");

const authRouter = express.Router();

authRouter.post("/register", validateBody(userJoiSchema), ctrl.register);

authRouter.post("/login", validateBody(userJoiSchema), ctrl.login);

authRouter.get("/current", authenticate, ctrl.getCurrent);

authRouter.post("/logout", authenticate, ctrl.logout);

module.exports = authRouter;
