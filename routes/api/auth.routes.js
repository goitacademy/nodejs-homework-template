const express = require("express");
const authController = require("../../controllers/auth/auth.controller");
const { validator, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/user");

const router = express.Router();

// Sign up
router.post(
  "/register",
  validator(schemas.registerSchema),
  authController.register
);

// Log in
router.post("/login", validator(schemas.loginSchema), authController.login);

// Get current User
router.get("/current", authenticate, authController.getCurrent);

module.exports = router;
