const express = require("express");

const ctrl = require("../../controllers/users");
const { validateBody, authenticate } = require("../../middlewares");

const { userSchemas } = require("../../models");

const router = express.Router();

router.post("5000/users/register", validateBody(userSchemas.registerSchema), ctrl.register);

router.post("5000/users/login", validateBody(userSchemas.loginSchema), ctrl.login);

router.post("5000/users/logout", authenticate, ctrl.logout);

router.get("5000/users/current", authenticate, ctrl.getCurrent);

router.patch(
  "/",
  authenticate,
  validateBody(userSchemas.updSubscriptionSchema),
  ctrl.updateSubscription
);


module.exports = router;