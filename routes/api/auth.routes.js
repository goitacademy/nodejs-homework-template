const express = require("express");
const authController = require("../../controllers/auth/auth.controller");
const { validator } = require("../../middlewares/index");
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

module.exports = router;
