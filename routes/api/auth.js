/** @format */

const express = require("express");

const ctrl = require("../../controllers/auth");

const { validateBody, authenticate } = require("../../middlewares");
const { authSchema, usersSubscriptionSchema } = require("../../models/user");

const router = express.Router();

router.post("/register", validateBody(authSchema), ctrl.register);

router.post("/login", validateBody(authSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch(
  "/users",
  authenticate,
  validateBody(usersSubscriptionSchema),
  ctrl.updateSubscription
);

module.exports = router;
