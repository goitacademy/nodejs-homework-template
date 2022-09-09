const express = require("express");
const {
  registrationController,
  loginController,
  logoutController,
  currentUserController,
} = require("../../controllers/authController");
const { authMiddleware } = require("../../middlewares/authMiddleware");
const { authValidation } = require("../../middlewares/validationMiddleware");
const router = new express.Router();

router.post("/register", authValidation, registrationController);
router.post("/login", authValidation, loginController);
router.post("/logout", authMiddleware, logoutController);
router.post("/current", authMiddleware, currentUserController);

module.exports = { authRouter: router };
