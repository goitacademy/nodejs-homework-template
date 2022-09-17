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
  userSubscriptionSchema,
  userVerificationEmailSchema,
  userRegistartionValidationSchema,
  userAuthorizationValidationSchema,
} = require("../../models/usersSchema");
const { validation } = require("../../middlewares/validation");
const { authMW } = require("../../middlewares/authMW");
const { upload } = require("../../helpers/uplodeAvatar");

const router = express.Router();

router.post(
  "/signup",
  validation(userRegistartionValidationSchema),
  errorHandler(signUpUser)
);

router.post(
  "/login",
  validation(userAuthorizationValidationSchema),
  errorHandler(logInUser)
);

router.post("/logout", authMW, errorHandler(logOutUser));

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
