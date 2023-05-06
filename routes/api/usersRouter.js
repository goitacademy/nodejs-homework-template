const express = require("express");

const { userValidationSchemas } = require("../../utils/validation");
const { validateBody } = require("../../utils");
const ctrl = require("../../controllers/users.controllers");
const { authenticate, upload } = require("../../middlewares");

const router = express.Router();

router.post(
  "/register",
  validateBody(userValidationSchemas.addSchema),
  ctrl.register
);

router.post(
  "/login",
  validateBody(userValidationSchemas.addSchema),
  ctrl.login
);

router.post("/logout", authenticate, ctrl.logout);

router.get("/current", authenticate, ctrl.getCurrent);

router.patch(
  "/subscription",
  authenticate,
  validateBody(userValidationSchemas.updateSubscriptionSchema),
  ctrl.updateSubscription
);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = router;
