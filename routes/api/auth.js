const express = require("express");

const controller = require("../../controllers/auth");

const { controllerWrapper } = require("../../helpers");

const { validateBody, authenticate } = require("../../middlewares");

const { schemas } = require("../../models/user");

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

router.get("/current", authenticate, controllerWrapper(controller.getCurrent));

router.get("/logout", authenticate, controllerWrapper(controller.logout));

module.exports = router;
