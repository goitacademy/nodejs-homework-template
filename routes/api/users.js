const express = require("express");
const { userControllers } = require("../../controllers");
const {
  validateBody,
  authenticate,
  upload,
  resizeAvatar,
} = require("../../middlewares");
const { userSchemas } = require("../../models");

const router = express.Router();

router.post(
  "/register",
  validateBody(userSchemas.registerSchema),
  userControllers.register
);

router.post(
  "/login",
  validateBody(userSchemas.loginSchema),
  userControllers.login
);

router.post("/logout", authenticate, userControllers.logout);

router.get("/current", authenticate, userControllers.getCurrent);

router.patch(
  "/",
  authenticate,
  validateBody(userSchemas.subscriptionUserSchema),
  userControllers.changeSubscription
);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  resizeAvatar,
  userControllers.updateAvatar
);

module.exports = router;