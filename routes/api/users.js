const express = require("express");
const { validation, authenticate } = require("../../middlewares");
const ctrlWrapper = require("../../helpers/ctrlWrapper");
const { registerSchema, loginSchema } = require("../../schemas");
const ctrl = require("../../controllers/users");
const router = express.Router();

router.post(
  "/register",
  validation(registerSchema),
  ctrlWrapper(ctrl.register)
);

router.post("/login", validation(loginSchema), ctrlWrapper(ctrl.login));

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));

router.post("/logout", authenticate, ctrlWrapper(ctrl.logout));

module.exports = router;
