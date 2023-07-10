const express = require("express");
const router = express.Router();

const {
  register,
  login,
  logout,
  getCurrent,
  userSubscription,
} = require("../../controllers/auth-controller");
const { validateBody, authMiddleware } = require("../../middlewares");
const { schemas } = require("../../models/user");

router.patch(
  "/",
  authMiddleware,
  validateBody(schemas.subscriptionSchema),
  userSubscription
);
router.post(
  "/register",
  validateBody(schemas.registerSchema, "fields"),
  register
);
router.post("/login", validateBody(schemas.loginSchema), login);
router.post("/logout", authMiddleware, logout);
router.post("/current", authMiddleware, getCurrent);

module.exports = router;
