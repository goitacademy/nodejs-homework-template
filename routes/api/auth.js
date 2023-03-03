const express = require("express");
const { users: ctrl } = require("../../controllers");
const { schemas } = require("../../models/user");

const { validation, ctrlWrapper } = require("../../middlewares");

const router = express.Router();

router.post(
  "/signup",
  validation(schemas.registerSchema),
  ctrlWrapper(ctrl.signup)
);

router.post("/login", validation(schemas.loginSchema), ctrlWrapper(ctrl.login));

module.exports = router;
