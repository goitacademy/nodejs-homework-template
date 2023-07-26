const express = require("express");
const middleW = require("../../middlewares");
const { schemas } = require("../../schemas");
const { userCtrl } = require("../../controlers");

const router = express.Router();

router.post(
  "/register",
  middleW.validateBody(schemas.registerSchema),
  userCtrl.register
);

router.post(
  "/login",
  middleW.validateBody(schemas.loginSchema),
  userCtrl.logIn
);

router.get("/current", middleW.authenticate, userCtrl.getCurrent);

router.post("/logout", middleW.authenticate, userCtrl.logOut);
router.patch(
  "/",
  middleW.authenticate,
  middleW.validateBody(schemas.updateSubscription),
  userCtrl.updateSubscription
);

router.patch(
  "/avatars",
  middleW.authenticate,
  middleW.uploadAvatar.single("avatar"),
  userCtrl.updateAvatar
);

module.exports = router;
