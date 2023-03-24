const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../../middlewares/authMiddleware");

const {
  validation,
} = require("../../middlewares/validation/validationMiddleware");

const {
  joiRegisterSchema,
  joiLoginSchema,
  joiUserSubscriptionSchema,
} = require("../../models/userModel");

const { asyncWrapper } = require("../../helpers/apiHelpers");

const {
  registrationController,
  logInController,
  logOutController,
  currentUserController,
  subscriptionUserController,
} = require("../../controllers/usersController");

router.post(
  "/register",
  validation(joiRegisterSchema),
  asyncWrapper(registrationController)
);
router.post(
  "/login",
  validation(joiLoginSchema),
  asyncWrapper(logInController)
);
router.post("/logout", authMiddleware, asyncWrapper(logOutController));
router.post("/current", authMiddleware, asyncWrapper(currentUserController));
router.patch(
  "/subscription",
  authMiddleware,
  validation(joiUserSubscriptionSchema),
  asyncWrapper(subscriptionUserController)
);

module.exports = {
  usersRouter: router,
};
