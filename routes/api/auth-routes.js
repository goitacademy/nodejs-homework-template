const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/auth-controllers");
const { validateBody } = require("../../utils/index.js");
const schemas = require("../../schemas/index.js");

router.post(
  "/register",
  validateBody(schemas.registrationSchema),
  ctrl.registerUser
);
router.post("/login", validateBody(schemas.loginSchema), ctrl.loginUser);

module.exports = router;
