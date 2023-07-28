const express = require("express");
const router = express.Router();

const {
  registerSchema,
  loginSchema,
  subscriptionSchema,
} = require("../../schemas/users");
const ctrl = require("../../controllers/auth/auth");

const { validateBody, authentication } = require("../../middlewares");

router.post("/register", validateBody(registerSchema), ctrl.register);
router.post("/login", validateBody(loginSchema), ctrl.login);
router.get("/current", authentication, ctrl.getCurrent);
router.post("/logout", authentication, ctrl.logout);
router.patch(
  "/",
  authentication,
  validateBody(subscriptionSchema),
  ctrl.updateSubscription
);

module.exports = router;
