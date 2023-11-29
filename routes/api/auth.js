const express = require("express");
const validateBody = require("../../midlewares/validateBody");
const { schemas } = require("../../models/user");
const ctrl = require("../../controllers/auth");
const authenticate = require("../../midlewares/authenticate");
const upload = require("../../midlewares/upload");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch(
  "/",
  authenticate,
  validateBody(schemas.updateSubscriptionSchema),
  ctrl.updateSubscription
);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = router;
