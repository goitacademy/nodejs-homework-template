const express = require("express");

const {
  validation,
  ctrlWrapper,
  authenticate,
  upload,
} = require("../middlewares");

const { schemas } = require("../models/userModel");

const { users: ctrl } = require("../controllers");

const router = express.Router();

const validateMiddlewareRegister = validation(schemas.registerSchema);
const validateMiddlewareLogin = validation(schemas.loginSchema);

router.post(
  "/register",
  validateMiddlewareRegister,
  ctrlWrapper(ctrl.register)
);

router.post("/login", validateMiddlewareLogin, ctrlWrapper(ctrl.login));

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));

router.post("/logout", authenticate, ctrlWrapper(ctrl.logout));

router.patch("/avatars", authenticate, upload.single("avatar"), ctrl.updateAvatar)

module.exports = router;
