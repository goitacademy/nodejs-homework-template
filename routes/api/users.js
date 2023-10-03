const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/users");

const { validateBody, authenticate } = require("../../middlewares");

const {
  registerSchema,
  loginSchema,
  updateSubSchema,
} = require("../../models/users");

router.post("/register", validateBody(registerSchema), ctrl.register);

router.post("/login", validateBody(loginSchema), ctrl.login);

router.post("/logout", authenticate, ctrl.logout);

router.get("/current", authenticate, ctrl.current);

router.patch(
  "/",
  authenticate,
  validateBody(updateSubSchema),
  ctrl.updateSubscription
);

module.exports = router;
