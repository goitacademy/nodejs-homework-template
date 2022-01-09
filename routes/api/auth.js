const express = require("express");
const {
  validation,
  controllerWrap,
  authenticate,
  limiter,
} = require("../../middlewares");
const { auth: ctrl } = require("../../controllers");
const { joiUserSchema } = require("../../models/User");
const router = express.Router();

// Route /api/auth/signup
router.post(
  "/signup",
  limiter(15 * 60 * 1000, 2),
  validation(joiUserSchema),
  controllerWrap(ctrl.signup)
);

router.post("/login", validation(joiUserSchema), controllerWrap(ctrl.login));

router.get("/logout", authenticate, controllerWrap(ctrl.logout));
router.get("/current", authenticate, controllerWrap(ctrl.current));

module.exports = router;
