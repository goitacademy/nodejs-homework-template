const express = require("express");
const ctrl = require("../../controllers/auth");
const { validateBody,authenticate } = require("../../middlewars");

const router = express.Router();

const { schemas } = require("../../models/user");

router.get("/current",authenticate, ctrl.getCurrent);

router.post(
  "/register",
  validateBody(schemas.registerSchemaSchema),
  ctrl.register
);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.post("/logout",authenticate, ctrl.logout);

router.patch(
  "/",
  validateBody(schemas.updateSubscriptionSchema),
  authenticate,
  ctrl.updateSubscription
);

module.exports = router;
