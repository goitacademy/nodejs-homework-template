const express = require("express");
const { validateBodyCreate } = require("../../middlewares");
const { schemas } = require("../../models/user");
const ctrl = require("../../controllers/auth");
const router = express.Router();

router.post(
  "/register",
  validateBodyCreate(schemas.registerSchema),
  ctrl.register
);

router.post("/login", validateBodyCreate(schemas.loginSchema), ctrl.login);

module.exports = router;
