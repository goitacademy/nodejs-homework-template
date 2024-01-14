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
  "/signup",
  isEmptyBody,
  validateBody(schemas.signUpSchema),
  authController.signUp
);

router.post(
  "/signin",
  isEmptyBody,
  validateBody(schemas.signInSchema),
  authController.singIn
);

router.get("/current", authenticate, authController.getCurrent);

router.post("/signout", authenticate, authController.signOut);

module.exports = router;
