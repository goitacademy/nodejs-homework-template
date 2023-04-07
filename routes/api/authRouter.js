const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../../middlewares/auth/authMiddleware");

const {
  validation,
} = require("../../middlewares/validation/validationMiddleware");

const { joiRegisterSchema, joiLoginSchema } = require("../../models/userModel");

const { asyncWrapper } = require("../../helpers/apiHelpers");

const {
  registrationController,
  logInController,
  logOutController,
  verificationController,
} = require("../../controllers/authController");

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
router.get("/verify/:verificationToken", asyncWrapper(verificationController));

module.exports = {
  authRouter: router,
};
