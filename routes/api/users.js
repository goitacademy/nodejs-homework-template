const express = require("express");
const router = express.Router();

const { controllerUsers } = require("../../controllers");
const { authMiddleware } = require("../../middlewares");

// =====================  REGISTER  =====================
router.post("/signup", controllerUsers.signup);

// =====================  LOGIN  =====================
router.post("/login", controllerUsers.login);

// =====================  GET CURRENT USER  =====================
// Using authorization/authentification Middleware that helps to get current user only if logged in
router.get("/current", authMiddleware, controllerUsers.getCurrent);

// =====================  LOGOUT  =====================
// Using authMiddleware to check if the user is logged-in
router.get("/logout", authMiddleware, controllerUsers.logout);

// =====================  UPDATE USER BY SUBSCRIPTION CATEGORY  ==================
router.patch(
  "/subscription",
  authMiddleware,
  controllerUsers.updateSubscription
);

module.exports = router;
