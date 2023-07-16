const express = require("express");

const authController = require("../../controllers/authControllers");

const schemas = require("../../schemas/users");

const router = express.Router();

const { validateBody } = require("../../decorators");

const { authenticate, upload } = require("../../middlewares");

router.post(
  "/register",
  validateBody(schemas.userRegisterSchema),
  authController.signup
);

router.get("/verfy/:verificationToken", authController.verify);

router.post(
  "/verify",
  validateBody(schemas.userEmailSchema),
  authController.resendVerify
);

router.post(
  "/login",
  validateBody(schemas.userRegisterSchema),
  authController.signin
);



router.get("/current", authenticate, authController.getCurrent);

router.post("/logout", authenticate, authController.logout);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  authController.updateAvatar
);


module.exports = router;