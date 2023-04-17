const express = require("express");

const ctrl = require("../../controllers/auth-controllers");

const { validateBody } = require("../../utils");

const { authenticate } = require("../../midlwares");

const { schemas } = require("../../models/user");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch(
  "/users",
  authenticate,
  validateBody(schemas.updateSubscriptionSchema),
  ctrl.updateSubscription
);

module.exports = router;
