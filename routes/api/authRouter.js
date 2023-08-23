const express = require("express");
const controllers = require("../../contollers/authControllers");

const validateBody = require("../../middleware/validateBody");
const { schemas } = require("../../models/userModel");

const router = express.Router();
router.post(
  "/register",
  validateBody(schemas.registerSchema),
  controllers.register
);
router.post("/login", validateBody(schemas.loginSchema), controllers.login);
module.exports = router;
