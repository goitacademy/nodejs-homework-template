const express = require("express");
const { auth: authCtrl } = require("../../controllers");
const { validateBody, authenticate } = require("../../middlewares");
const { userSchemas } = require("../../models");

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(userSchemas.register),
  authCtrl.signup
);

authRouter.post("/login", validateBody(userSchemas.login), authCtrl.signin);

authRouter.post("/logout", authenticate, authCtrl.signout);

module.exports = authRouter;
