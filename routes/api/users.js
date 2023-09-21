const express = require("express");

const { validateBody, validateBodySubscription, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/user");
const ctrl = require("../../controllers/auth");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.registr);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch(
  "/",
  authenticate,
  validateBodySubscription(schemas.subscriptionSchema),
  ctrl.subscription
);

module.exports = router;
// , validateBody(schemas.subscriptionSchema)
