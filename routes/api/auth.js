const express = require("express");
const { validation, ctrlWrapper } = require("../../middlerwares");
const { schemas } = require("../../models/user");
const { authController: ctrl } = require("../../controllers");

const router = express.Router();

router.post(
  "/register",
  validation(schemas.registerSchema),
  ctrlWrapper(ctrl.register)
);
// router.posr("/singup")

router.post("/login", validation(schemas.loginSchema), ctrlWrapper(ctrl.login));
// roter.post('/singin')

module.exports = router;
