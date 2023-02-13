const express = require("express");
const { validationMiddleware, authMiddleware } = require("../../middlewares");
const { errorHandler } = require("../../helpers");
const {
  userSignupSchema,
  userLoginSchema,
  userSubscriptionSchema,
} = require("../../schemas");
const {
  signupUserController,
  loginUserController,
  logoutUserController,
  getCurrentUserController,
  updateUserSubscriptionController,
} = require("../../controllers");

const router = express.Router();

router.post(
  "/signup",
  validationMiddleware(userSignupSchema),
  errorHandler(signupUserController)
);

router.post(
  "/login",
  validationMiddleware(userLoginSchema),
  errorHandler(loginUserController)
);

router.get("/logout", authMiddleware, errorHandler(logoutUserController));

router.get("/current", authMiddleware, errorHandler(getCurrentUserController));

router.patch(
  "/",
  authMiddleware,
  validationMiddleware(userSubscriptionSchema),
  errorHandler(updateUserSubscriptionController)
);

module.exports = router;
