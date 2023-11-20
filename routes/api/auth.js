const express = require("express");
const { validateBody } = require("../../validation/validateBody");
const {
  registerSchema,
  loginSchema,
} = require("../../validation/userValidationSchema");

const {
  register,
  login,
  getCurrent,
  logout,
} = require("../../controllers/auth");
const { authenticate } = require("../../middlewares/authenticate");
const router = express.Router();

router.post("/register", validateBody(registerSchema), register);

router.post("/login", validateBody(loginSchema), login);

router.post("/logout", authenticate, logout);
router.get("/current", authenticate, getCurrent);
module.exports = router;
