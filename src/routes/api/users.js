const express = require("express");
const {
  signUpUser,
  logInUser,
  logOutUser,
  getCurrentUser,
  updateUserSubscription,
  changeUseravatar,
  getUserByVerificationToken,
  resendVerificationEmail,
} = require("../../controller/usersController");

const { errorHandler } = require("../../helpers/errorHandler");

const {
  userValidationSchema,
  userSubscriptionSchema,
  userVerificationEmailSchema,
} = require("../../models/usersSchema");
const { validation } = require("../../middlewares/validation");
const { authMW } = require("../../middlewares/authMW");
const { upload } = require("../../helpers/uplodeAvatar");

const router = express.Router();

router.post(
  "/signup",
  validation(userValidationSchema),
  errorHandler(signUpUser)
);

router.post(
  "/login",
  validation(userValidationSchema),
  errorHandler(logInUser)
);

router.get("/logout", authMW, errorHandler(logOutUser));

router.get("/current", authMW, errorHandler(getCurrentUser));

router.patch(
  "/avatars",
  authMW,
  upload.single("avatar"),
  errorHandler(changeUseravatar)
);

router.patch(
  "/",
  authMW,
  validation(userSubscriptionSchema),
  errorHandler(updateUserSubscription)
);

router.get(
  "/verify/:verificationToken",
  errorHandler(getUserByVerificationToken)
);

router.post(
  "/verify",
  validation(userVerificationEmailSchema),
  errorHandler(resendVerificationEmail)
);

module.exports = router;
