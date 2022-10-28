const express = require("express");
const router = express.Router();

const { auth: ctrl } = require("../../controllers");
const { validation, authentic } = require("../../middlewares");
const { schemas } = require("../../models/user");
const ctrlWrapper = require("../../helpers/ctrlWrapper");

router.post(
  "/signup",
  validation(schemas.registerSchema),
  ctrlWrapper(ctrl.signup)
);

router.post("/login", validation(schemas.loginSchema), ctrlWrapper(ctrl.login));

router.get("/logout", authentic, ctrlWrapper(ctrl.logout));

module.exports = router;
