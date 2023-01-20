const express = require("express");

const ctrl = require("../../controllers/auth");

const { controllerWrapper } = require("../../helpers");

const { validateBody, authenticate } = require("../../middlevares");

const { schemas } = require("../../models/user");

const router = express.Router();

router.post(
  "/users/signup",
  validateBody(schemas.signupSchema),
  controllerWrapper(ctrl.signup)
);
router.post(
  "/users/login",
  validateBody(schemas.loginSchema),
  controllerWrapper(ctrl.login)
);
router.get("/users/current", authenticate, controllerWrapper(ctrl.getCurrent));
router.post("/users/logout", authenticate, controllerWrapper(ctrl.logout));
router.patch(
  "/users",
  authenticate,
  validateBody(schemas.updateSubscriptionSchema),
  controllerWrapper(ctrl.updateSubscription)
);

module.exports = router;