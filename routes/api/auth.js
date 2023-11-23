const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/auth");
const schemas = require("../../models/user");
const { authBothSchema, updateSubscriptionSchema } = schemas;

const { validateBody, authenticate } = require("../../middlewares");

router.post("/register", validateBody(authBothSchema), ctrl.register);
router.post("/login", validateBody(authBothSchema), ctrl.login);
router.get("/logout", authenticate, ctrl.logout);
router.get("/current", authenticate, ctrl.getCurrent);
router.patch(
  "/:userId/subscription",
  authenticate,
  validateBody(updateSubscriptionSchema),
  ctrl.updateSubscriptionById
);

module.exports = router;
