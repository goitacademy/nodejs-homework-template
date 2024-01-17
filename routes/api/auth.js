const express = require("express");
const authController = require("../../controllers/authController");
const {
  validateBody,
  authenticate,
  isEmptyBody,
} = require("../../middlewares");
const { schemas } = require("../../models/user");
const router = express.Router();

router.post(
  "/register",
  isEmptyBody,
  validateBody(schemas.signUpSchema),
  authController.signUp
);

router.post(
  "/login",
  isEmptyBody,
  validateBody(schemas.signInSchema),
  authController.singIn
);

router.get("/current", authenticate, authController.getCurrent);

router.post("/logout", authenticate, authController.signOut);

router.patch(
  "/",
  authenticate,
  isEmptyBody,
  validateBody(schemas.updateSubscriptionSchema),
  authController.updateSubscriptionUser
);

module.exports = router;
