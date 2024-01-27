const express = require("express");
const router = express.Router();

const { authController } = require("../../controllers");
const { validateData, authenticate } = require("../../middlewares");
const { userModel } = require("../../models/");

const { schemas } = userModel;

router.post(
  "/signup",
  validateData(schemas.registerSchema),
  authController.signup
);

router.post(
  "/login",
  validateData,
  schemas.registerSchema,
  authController.login
);

router.get("/current", authenticate, authController.getCurrent);

router.post("/logout", authenticate, authController.logout);

router.patch(
  "/",
  authenticate,
  validateData,
  schemas.subscriptionSchema,
  authController.updateSubscription
);

module.exports = router;
