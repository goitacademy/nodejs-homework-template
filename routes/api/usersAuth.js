const express = require("express");
const {
  usersValidation,
  updateUserSubscriptionValidation,
} = require("../../middlewares/validationMiddleware");
const {
  verifyTokenMiddleware,
} = require("../../middlewares/verifyTokenMiddleware");
const { asyncWrapper } = require("../../helpers/apiHelpers");
const {
  userSignUpController,
  userLoginController,
  userLogoutController,
  getCurrentUserController,
  updateSubscriptionController,
} = require("../../controllers/usersAuthController");

const usersRouter = express.Router();

usersRouter.post(
  "/signup",
  usersValidation,
  asyncWrapper(userSignUpController)
);

usersRouter.post("/login", usersValidation, asyncWrapper(userLoginController));

usersRouter.get(
  "/logout",
  verifyTokenMiddleware,
  asyncWrapper(userLogoutController)
);

usersRouter.get(
  "/current",
  verifyTokenMiddleware,
  asyncWrapper(getCurrentUserController)
);

usersRouter.patch(
  "/",
  updateUserSubscriptionValidation,
  verifyTokenMiddleware,
  asyncWrapper(updateSubscriptionController)
);

module.exports = usersRouter;
