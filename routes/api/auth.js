const express = require("express");
const { body } = require("express-validator");
const authController = require("../../controllers/auth");
const authenticate = require("../../middlewares/auth");

const router = express.Router();

router.post(
  "/signup",
  [body("email").isEmail(), body("password").isLength({ min: 6 })],
  authController.signup
);

router.post("/login", authController.login);

router.get("/logout", authenticate, authController.logout);

module.exports = router;
