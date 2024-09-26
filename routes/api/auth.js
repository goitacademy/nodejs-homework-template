const express = require("express");
const router = express.Router();
const validateBody = require("../../middlewares/validateBody");
const { schemas } = require("../../models/user");
const authenticate = require("../../middlewares/authenticate");
const ctrl = require("../../controllers/auth");

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("logout", authenticate, ctrl.logout);

router.patch(
  "/:id/subscription",
  authenticate,
  validateBody(schemas.updateSubscriptionSchema),
  ctrl.updateSubscription
);

module.exports = router;
