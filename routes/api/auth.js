const express = require("express");

const ctrl = require("../../controllers/auth");

const { isValidUserId, authenticate } = require("../../middlewares");

const router = express.Router();

router.post("/register", ctrl.register);

router.post("/login", ctrl.login);

router.post("/logout", authenticate, ctrl.logout);

router.get("/current", authenticate, ctrl.getCurrent);

router.patch(
  "/:id/subscription",
  authenticate,
  isValidUserId,
  ctrl.updateSubscriptionUser
);

module.exports = router;
