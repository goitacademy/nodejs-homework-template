const express = require("express");

const { ctrlAuth } = require("../../../controllers");

const { validateBody, isValidId } = require("../../../middleware");

const { userJoiSchemas } = require("../../../models");

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(userJoiSchemas.registerSchema),
  ctrlAuth.register
);

authRouter.post(
  "/login",
  validateBody(userJoiSchemas.loginSchema),
  ctrlAuth.login
);

module.exports = authRouter;
