const express = require("express");

const { usersController } = require("../../controllers");

const { usersJoiSchemas } = require("../../schemas");

const { validateBody } = require("../../decorators");

const { authenticate, upload } = require("../../middlewares");

const router = express.Router();

router.post(
  "/register",
  validateBody(usersJoiSchemas.userRegisterSchema),
  usersController.registerUser
);

router.post(
  "/login",
  validateBody(usersJoiSchemas.userLoginSchema),
  usersController.loginUser
);

router.get("/current", authenticate, usersController.getCurrent);

router.post("/logout", authenticate, usersController.logout);

router.patch(
  "/",
  authenticate,
  validateBody(usersJoiSchemas.userUpdateSubscription),
  usersController.updateSubscription
);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatarURL"),
  usersController.updateAvatar
);

module.exports = router;
