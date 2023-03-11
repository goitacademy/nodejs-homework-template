const express = require("express");
const { controllerWrapper } = require("../../helpers");
const router = express.Router();
const {
  loginUserController,
  signupUserController,
  currentUserController,
  logoutUserController,
  userSubscriptionController,
  avatarUpdateController,
} = require("../../controllers/users");
const {
  userAuthMiddleware,
  validateBody,
  upload,
} = require("../../middlewares");
const { userSchema } = require("../../schemas");

router.post(
  "/signup",
  validateBody(userSchema.userLogin),
  controllerWrapper(signupUserController)
);
router.post(
  "/login",
  validateBody(userSchema.userLogin),
  controllerWrapper(loginUserController)
);

router.get(
  "/current",
  userAuthMiddleware,
  controllerWrapper(currentUserController)
);
router.get(
  "/logout",
  userAuthMiddleware,
  controllerWrapper(logoutUserController)
);
router.patch(
  "/subscription",
  userAuthMiddleware,
  validateBody(userSchema.userSubscription),
  controllerWrapper(userSubscriptionController)
);
router.patch(
  "/avatars",
  userAuthMiddleware,
  upload.single("avatar"),
  controllerWrapper(avatarUpdateController)
);

module.exports = router;
