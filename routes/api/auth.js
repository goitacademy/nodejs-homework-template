const express = require("express");
const {
  validation,
  controllerWrap,
  authenticate,
} = require("../../middlewares");
const { auth: ctrl } = require("../../controllers");
const { joiUserSchema } = require("../../models/User");
const router = express.Router();

// Route /api/auth/register
router.post(
  "/register",
  validation(joiUserSchema),
  controllerWrap(ctrl.register)
);

router.post("/login", validation(joiUserSchema), controllerWrap(ctrl.login));

router.get("/logout", authenticate, controllerWrap(ctrl.logout));

module.exports = router;
