const express = require("express");

const authController = require("../../controllers/authController");

const { validateBody, isAuthenticated } = require("../../middlewares");

const { schemas } = require("../../models/user");

const router = express.Router();

router.post(
  "/register",
  validateBody(schemas.joiRegisterSchema),
  authController.register
);

router.post(
  "/login",
  validateBody(schemas.joiLoginSchema),
  authController.login
);

router.post("/logout", isAuthenticated, authController.logout);

router.get("/current", isAuthenticated, authController.getCurrent);

router.patch(
  "/",
  isAuthenticated,
  validateBody(schemas.joiSubscriptionSchema),
  authController.updateSubscription
);

module.exports = router;
