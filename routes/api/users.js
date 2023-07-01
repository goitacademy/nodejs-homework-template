const express = require('express');

const authController = require('../../controllers/auth-controller');

const schemas = require("../../schemas/users");

const { validateBody } = require("../../decorators");

const { authentificate, upload } = require("../../middlewares");

const router = express.Router();

router.post(
  "/register",
  validateBody(schemas.userRegisterSchema),
  authController.signup
);

router.post(
  "/login",
  validateBody(schemas.userLoginSchema),
  authController.signin
);

router.get("/verify/:verificationCode", authController.verify);

router.post("/verify", validateBody(schemas.userEmailSchema), authController.resendVerify);

router.get('/current', authentificate, authController.getCurrent);

router.post("/logout", authentificate, authController.logout);

router.patch(
  "/avatars",
  authentificate,
  upload.single("avatarURL"),
  authController.updateAvatar
);

module.exports = router;