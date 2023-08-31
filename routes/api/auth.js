const express = require("express");

const { validateBody, auth, upload } = require("../../Middlewares");
const { schemas } = require("../../models/user");
const { users: ctrl } = require("../../Controller");

const router = express.Router();

router.post(
  "/register",
  validateBody(schemas.registerLoginSchema),
  ctrl.register
);

router.post("/login", validateBody(schemas.registerLoginSchema), ctrl.login);

router.get("/current", auth, ctrl.getCurrent);

router.post("/logout", auth, ctrl.logout);

router.patch(
  "/",
  auth,
  validateBody(schemas.updateSubscriptionSchema),
  ctrl.updateSubscription
);

router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = router;