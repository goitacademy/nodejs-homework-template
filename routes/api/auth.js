const express = require("express");
const router = express.Router();

const { validation, ctrlWrapper } = require("../../middlewares");
const { schemas } = require("../../models/user");
const { users: ctrl } = require("../../controllers");

router.post(
  "/signup",
  validation(schemas.registerSchema),
  ctrlWrapper(ctrl.register)
);

router.post("/login", validation(schemas.loginSchema), ctrlWrapper(ctrl.login));

module.exports = router;
