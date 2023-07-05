const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/user");
const { authenticate } = require("../../middlewarpes");
const { validateBody } = require("../../middlewarpes");
const schemas = require("../../schemas/user");

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);
router.get("/users/current", authenticate, ctrl.getCurrent);
router.post("/logout", authenticate, ctrl.logout);
router.patch(
  "/users/",
  authenticate,
  validateBody(schemas.updateSubscriptionSchema),
  ctrl.updateStatusSubscription
);

module.exports = router;
