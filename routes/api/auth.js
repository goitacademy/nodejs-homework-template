const express = require("express");

const { controllerWrapper } = require("../../helpers");
const { validateBody, auth, upload } = require("../../middlewares");
const { schemas } = require("../../models/user");

const usersController = require("../../controllers/auth");

const router = express.Router();

router.post(
  "/register",
  validateBody(schemas.registerSchema),
  controllerWrapper(usersController.register)
);

router.get(
  "/verify/:verificationToken",

  controllerWrapper(usersController.verifyEmail)
);

router.post(
  "/verify",
  validateBody(schemas.emailSchema),
  controllerWrapper(usersController.resendVerifyEmail)
);

router.post(
  "/login",
  validateBody(schemas.loginSchema),
  controllerWrapper(usersController.login)
);

router.get("/current", auth, controllerWrapper(usersController.getCurrent));

router.post("/logout", auth, controllerWrapper(usersController.logout));

router.patch(
  "/subscription",
  auth,
  validateBody(schemas.subscriptionSchema),
  controllerWrapper(usersController.updateSubscription)
);

router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  controllerWrapper(usersController.updateAvatar)
);

module.exports = router;
