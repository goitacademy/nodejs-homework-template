const express = require("express");
const router = express.Router();
const { asyncWrapper } = require("../helpers/apiHelpers");

const {
  registrationController,
  loginController,
  logoutController,
  currentUserController,
  changeSubscriptionController
} = require("../controllers/authController");
const {
  userRegisterValidation,
  userLoginValidation,
  userSubscriptionValidation
} = require("../middlewares/authValidationMiddleware");
const {authMiddleware} = require("../middlewares/authMiddleware");

router.post("/signup", userRegisterValidation, asyncWrapper(registrationController));
router.post("/login", userLoginValidation, asyncWrapper(loginController));
router.get("/logout", authMiddleware, asyncWrapper(logoutController));
router.get("/current", authMiddleware, asyncWrapper(currentUserController));
router.patch("/",authMiddleware, userSubscriptionValidation, asyncWrapper(changeSubscriptionController))

module.exports = router;
