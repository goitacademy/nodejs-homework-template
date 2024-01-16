const express = require("express");
const router = express.Router();

const { validateBody, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/user");
const ctrl = require("../../controllers/user");

// Signup
router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

// Signin
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

// Get current user
router.get("/current", authenticate, ctrl.getCurrent);

// Logout
router.post("/logout", authenticate, ctrl.logout);

module.exports = router;
