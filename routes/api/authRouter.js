const express = require("express");
const {
  registerController,
  loginController,
  logoutController,
  currentUserController,
  updateSubscriptionController,
} = require("../../controller/authController");
const validateRequestBody = require("../../validation/middlewares/validationRequestMiddleware");
const {
  schemaAuth,
  schemaUpdateSubscription,
} = require("../../validation/createUserSchema");
const checkAuth = require("../../validation/middlewares/checkAuthMiddleware");

const router = express.Router();

router.post("/signup", validateRequestBody(schemaAuth), registerController);

router.post("/login", validateRequestBody(schemaAuth), loginController);

router.patch("/logout", checkAuth, logoutController);

router.get("/current", checkAuth, currentUserController);

router.patch(
  "/",
  validateRequestBody(schemaUpdateSubscription),
  checkAuth,
  updateSubscriptionController
);

module.exports = router;
