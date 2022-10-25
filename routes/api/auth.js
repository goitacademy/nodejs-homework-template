const express = require("express");

const controller = require("../../controllers/auth");

const { controllerWrapper } = require("../../helpers");

const { validateBody } = require("../../middlewares");

const { schemas } = require("../../models/users");

const router = express.Router();

router.post(
  "/register",
  validateBody(schemas.registerSchema),
  controllerWrapper(controller.register),
);

router.post(
  "/login",
  validateBody(schemas.loginSchema),
  controllerWrapper(controller.login),
);

module.exports = router;
