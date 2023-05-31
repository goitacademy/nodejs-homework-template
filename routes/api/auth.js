const express = require("express");
const { validateBody, authenticate } = require("../../middlewarse");
const { schemas } = require("../../models/user");
const ctrl = require("../../controllers/auth");

const router = express.Router();

router.post(
  "/register",
  validateBody.validateBodyPost(schemas.registerSchema),
  ctrl.register
);

router.post(
  "/login",
  validateBody.validateBodyPost(schemas.loginSchema),
  ctrl.login
);

router.get("/current", authenticate, ctrl.getCurrent);
router.post("/logout", authenticate, ctrl.logout);
router.patch(
  "/subscription",
  authenticate,
  validateBody.validateUsersPatch(schemas.updateSubscriptionUser),
  ctrl.updateSubscriptionUser
);

module.exports = router;
