const express = require("express");
const {
  registrationController,
  loginController,
  logoutController,
  getCurrentUserController,
} = require("../../controllers/userControllers");
const { authMiddleware } = require("../../middleware/authMiddleware.js");
const { userValidation } = require("../../middleware/middleware");
const router = express.Router();
const tryCatch = require("../../utils/try-catch.utils");


router
  .post("/register", userValidation, tryCatch(registrationController))
  .get("/login", userValidation, tryCatch(loginController))
  .post("/logout", authMiddleware, tryCatch(logoutController))
  .get("/current", authMiddleware, tryCatch(getCurrentUserController));

module.exports = router;
