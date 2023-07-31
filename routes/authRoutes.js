const express = require('express');

const validation = require('../Middlewares/validationMiddlewares');
const { schema } = require('../models/user.models');
const { users: ctrl } = require('../controlers');
const authenticate = require('../Middlewares/authMiddlewares');

const router = express.Router();

router.post(
  "/register",
  validation.registerValid(schema.registerSchema),
  ctrl.register
);

router.post("/login", validation.loginValid(schema.loginSchema), ctrl.login);

router.post("/logout", authenticate, ctrl.logout);

router.get("/current", authenticate, ctrl.getCurrent);

router.patch(
  "/",
  authenticate,
  validation.updateSubscriptionValid(schema.updateSubscriptionSchema),
  ctrl.updateSubscription
);

module.exports = router;