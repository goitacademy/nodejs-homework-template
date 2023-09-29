const express = require("express");

const { auth: ctrl } = require("../../controllers");
const { validateBody, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/user");

const router = express.Router();

// Sign Up
router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

// Sign In
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

// Get current user
router.get("/current", authenticate, ctrl.getCurrent);

// Logout
router.post("/logout", authenticate, ctrl.logout);

module.exports = router;
