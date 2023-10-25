const { Router } = require("express");

const authController = require("../../controllers/auth-controller");

const isEmptyBody = require("../../middlewares/isEmptyBody");
const authenticate = require("../../middlewares/authenticate");
const validateBody = require("../../decorators/validateBody.js");

const {
  userSignupSchema,
  userSigninSchema,
  userUpdateSubscriptionSchema,
} = require("../../models/User");

const userSignupValidate = validateBody(userSignupSchema);
const userSigninValidate = validateBody(userSigninSchema);
const userUpdateSubValidate = validateBody(userUpdateSubscriptionSchema);

const upload = require("../../middlewares/upload.js");
const resizeAvatar = require("../../middlewares/resizeAvatar.js");

const authRouter = Router();

authRouter.post(
  "/users/register",
  upload.single("avatarURL"),
  isEmptyBody,
  userSignupValidate,
  resizeAvatar,
  authController.signup
);

authRouter.post(
  "/users/login",
  isEmptyBody,
  userSigninValidate,
  authController.signin
);

authRouter.get("/users/current", authenticate, authController.getCurrent);

authRouter.post("/users/logout", authenticate, authController.signOut);

authRouter.patch(
  "/users",
  isEmptyBody,
  authenticate,
  userUpdateSubValidate,
  authController.updateSubscription
);

authRouter.patch(
  "/users/avatars",
  upload.single("avatarURL"),
  resizeAvatar,
  authenticate,
  authController.updateAvatar
);

module.exports = authRouter;
