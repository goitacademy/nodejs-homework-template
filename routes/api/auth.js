const express = require("express");
const ctrl = require("../../controllers/auth");
const validateBody = require("../../middlewares/validateBody");
const { schemas } = require("../../models/Users");
const authenticate = require("../../middlewares/authenticate");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);
router.post("/logout", authenticate, ctrl.logout);
router.get("/current", authenticate, ctrl.currentUser);
router.patch(
  "/",
  authenticate,
  validateBody(schemas.updateBySubscriptionSchema),
  ctrl.updateBySubscription
);

module.exports = router;
