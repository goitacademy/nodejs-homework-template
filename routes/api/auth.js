const express = require("express");

const router = express.Router();

const {
  register,
  logIn,
  logOut,
  currentUser,
  updateUserSubscription,
  updateUserAvatar,
  verifyToken,
  resendEmail,
} = require("../../controllers");

const { schemas } = require("../../models/user");
const {
  authenticate,
  validateBody,
  uploadAvatar,
} = require("../../middlewares");

router.post("/register", validateBody(schemas.userValidator), register);

router.post("/login", validateBody(schemas.userValidator), logIn);

router.post("/logout", authenticate, logOut);

router.get("/current", authenticate, currentUser);

router.patch(
  "/subscription",
  authenticate,
  validateBody(schemas.userSubscriptionValidator),
  updateUserSubscription
);

router.patch(
  "/avatars",
  authenticate,
  uploadAvatar.single("avatar"),
  updateUserAvatar
);

router.get("/verify/:verificationToken", verifyToken);

router.post("/verify/", validateBody(schemas.userEmailValidator), resendEmail);

module.exports = router;
