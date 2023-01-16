const express = require("express");
const router = express.Router();
const controllers = require("../../controllers/users");
const { userSchemas } = require("../../schemas");
const { validateBody, authenticate, upload } = require("../../middlewares");

router.post(
  "/users/register",
  validateBody(userSchemas.validateUserSchema),
  controllers.register
);

router.get("/users/verify/:verificationToken", controllers.verify);

router.post(
  "/users/verify",
  validateBody(userSchemas.emailSchema),
  controllers.resendVerifyEmail
);

router.post(
  "/users/login",
  validateBody(userSchemas.validateUserSchema),
  controllers.login
);

router.get("/users/current", authenticate, controllers.getCurrent);

router.post("/users/logout", authenticate, controllers.logout);

router.patch(
  "/users/subscription",
  authenticate,
  validateBody(
    userSchemas.updateSubscriptionSchema,
    "Invalid type of subscription"
  ),
  controllers.updateSubscription
);

router.patch(
  "/users/avatars",
  authenticate,
  upload.single("avatar"),
  controllers.updateAvatar
);

module.exports = router;
