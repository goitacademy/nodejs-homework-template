const express = require("express");
const { validateBody, authenticate } = require("../../middlewares");
const { schemaAuth } = require("../../schemas");
const {
  register,
  login,
  getCurrent,
  logout,
} = require("../../controlers/auth");

const router = express.Router();

router.post("/register", validateBody(schemaAuth.registerSchema), register);

router.post("/login", validateBody(schemaAuth.loginSchema), login);

router.post("/logout", authenticate, logout);

router.get("/current", authenticate, getCurrent);

module.exports = router;
