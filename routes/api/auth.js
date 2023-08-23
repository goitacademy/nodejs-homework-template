const express = require("express");
const {
  register,
  login,
  logout,
  current,
  updateSubscriptionUser,
} = require("../../controllers");
const { validateBody, authenticate } = require("../../middlewares");
const { schemas } = require("../../models");
const { ctrlWrapper } = require("../../utils");
const router = express.Router();
router.post(
  "/register",
  validateBody(schemas.registerSchema),
  ctrlWrapper(register)
);
router.post("/login", validateBody(schemas.loginSchema), ctrlWrapper(login));
router.post("/logout", authenticate, ctrlWrapper(logout));
router.get("/current", authenticate, ctrlWrapper(current));
router.patch(
  "/",
  authenticate,
  validateBody(schemas.updateSubscriptionSchema),
  ctrlWrapper(updateSubscriptionUser)
);
module.exports = router;
