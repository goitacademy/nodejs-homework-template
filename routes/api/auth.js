const express = require("express");

const {
  validateBody,
  authenticate,
  uploadAvatar,
} = require("../../middlewares");

const { ctrlWrapper } = require("../../helpers");

const { schemas } = require("../../models/user");

const { getCurrent, logout } = require("../../controllers/auth");

const ctrl = require("../../controllers/auth");

const router = express.Router();

router.post(
  "/register",
  validateBody(schemas.registerSchema),
  ctrlWrapper(ctrl.register)
);

router.post(
  "/login",
  validateBody(schemas.loginSchema),
  ctrlWrapper(ctrl.login)
);

router.get("/current", authenticate, ctrlWrapper(getCurrent));
router.get("/logout", authenticate, ctrlWrapper(logout));

router.patch(
  "/avatars",
  authenticate,
  uploadAvatar.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
