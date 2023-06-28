const express = require("express");

const {
  validation,
  ctrlWrapper,
  //  isValidId,
  authenticate,
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

module.exports = router;
