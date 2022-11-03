const express = require("express");

const controller = require("../../controllers/auth");

const { controllerWrapper } = require("../../helpers");

const { validateBody, authenticate } = require("../../middlewares");

const { schemas } = require("../../models/user");

const router = express.Router();

// main rout -> http://localhost:3000/api/auth

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

router.get("/logout", authenticate, controllerWrapper(controller.logout));

module.exports = router;
