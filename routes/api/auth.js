const express = require("express");

const { schemas } = require("../../utils/validation");

const { validateBody, authenticate } = require("../../middlewares");

const ctrl = require("../../controllers/auth");

const router = express.Router();

router.post(
  "/register",
  validateBody(schemas.registerSchema),
  ctrl.registerUser
);

router.post("/login", validateBody(schemas.loginSchema), ctrl.loginUser);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

module.exports = router;
