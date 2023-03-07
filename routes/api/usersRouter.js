const express = require("express");
const { controllerWrapper } = require("../../helpers");
const router = express.Router();
const {
  loginUserController,
  signupUserController,
  currentUserController,
  logoutUserController,
  userSubscriptionController,
} = require("../../controllers/users");
const { userAuthMiddleware, validateBody } = require("../../middlewares");
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
  controllerWrapper(userAuthMiddleware),
  controllerWrapper(currentUserController)
);
router.get(
  "/logout",
  controllerWrapper(userAuthMiddleware),
  controllerWrapper(logoutUserController)
);
router.patch(
  "/subscription/",
  controllerWrapper(userAuthMiddleware),
  validateBody(userSchema.userSubscription),
  controllerWrapper(userSubscriptionController)
);

module.exports = router;
