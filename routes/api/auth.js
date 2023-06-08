const express = require("express");
const validateBody = require("../../decorators/validateBody.js");
const ctrl = require("../../controllers/auth.js");
const { schemas } = require("../../models/user.js");
const authenticate = require("../../middleware/authenticate.js");
const validateSubsBody = require("../../decorators/validateSubsBody.js");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);
router.get("/current", authenticate, ctrl.getCurrent);
router.post("/logout", authenticate, ctrl.logout);
router.patch(
  "/subscription",
  authenticate,
  validateSubsBody(schemas.subscriptionSchema),
  ctrl.updateSubscription
);

module.exports = router;
