const express = require("express");
const { shema } = require("../../models/user");
const ctrl = require("../../controlers/users");
const { validateBody, Authenticate } = require("../../middlewares");
const router = express.Router();

router.post("/register", validateBody(shema.registerShema), ctrl.register);

router.post("/login", validateBody(shema.loginShema), ctrl.login);

router.post("/logout", Authenticate, ctrl.logout);

router.get("/current", Authenticate, ctrl.current);

router.patch(
  "/subscription",
  Authenticate,
  validateBody(shema.updateSubscriptionSchema),
  ctrl.subscription
);

module.exports = router;
