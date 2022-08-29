const { users: ctrl } = require("../../controllers");
const { userAuth, validation, ctrlWrapper } = require("../../middlewares");
const { joiUserSchema } = require("../../models");

const express = require("express");

const router = express.Router();

router.post("/signup", validation(joiUserSchema), ctrlWrapper(ctrl.signup));

router.post("/login", validation(joiUserSchema), ctrlWrapper(ctrl.login));

router.get(
  "/logout",
  userAuth,
  validation(joiUserSchema),
  ctrlWrapper(ctrl.logout)
);

module.exports = router;
