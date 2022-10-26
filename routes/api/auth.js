const express = require("express");

const { controllerWrapper } = require("../../helpers");

const { validateBody, authenticate } = require("../../middlewares");

const { schemas } = require("../../models/user");

const ctrl = require("../../controllers/auth");

const router = express.Router();

router.post(
  "/register",
  validateBody(schemas.registerSchema),
  controllerWrapper(ctrl.register)
);

router.post(
  "/login",
  validateBody(schemas.loginSchema),
  controllerWrapper(ctrl.login)
);

router.get("/current", authenticate, controllerWrapper(ctrl.getCurrent));

router.get("/logout", authenticate, controllerWrapper(ctrl.logout));

module.exports = router;
