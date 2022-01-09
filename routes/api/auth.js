const express = require("express");
const { TIME_REQUEST_LIMIT, REQUEST_LIMIT } = require("../../config/constants");
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
  limiter(TIME_REQUEST_LIMIT, REQUEST_LIMIT),
  validation(joiUserSchema),
  controllerWrap(ctrl.signup)
);

router.post("/login", validation(joiUserSchema), controllerWrap(ctrl.login));

router.get("/logout", authenticate, controllerWrap(ctrl.logout));

module.exports = router;
