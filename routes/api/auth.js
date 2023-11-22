const express = require("express");
const { validateBody } = require("../../validation/validateBody");
const {
  registerSchema,
  loginSchema,
} = require("../../validation/userValidationSchemas");
const { register, login } = require("../../controllers/auth");

const router = express.Router();

router.post("/register", validateBody(registerSchema), register);
router.post("/login", validateBody(loginSchema), login);

module.exports = router;
