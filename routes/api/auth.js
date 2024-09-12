const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/users");

const { validateBody, authenticate } = require("../../middlewares");

const { schemas } = require("../../models/users");

router.post(
  "/register",
  validateBody(schemas.emptyBody),
  validateBody(schemas.usersSchema),
  ctrl.register
);

router.post(
  "/login",
  validateBody(schemas.emptyBody),
  validateBody(schemas.usersSchema),
  ctrl.login
);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch(
  "/",
  authenticate,
  validateBody(schemas.emptyBody),
  validateBody(schemas.subscriptionSchema),
  ctrl.updateSubscription
);

module.exports = router;
