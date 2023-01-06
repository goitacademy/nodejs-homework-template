const express = require("express");

const router = express.Router();

const { validation, ctrlWrapper } = require("../../middlewares");
const auth = require("../../middlewares/auth");

const { joiUserSchema, joiLoginSchema } = require("../../models/users");
const { auth: ctrl } = require("../../controllers");

router.post(
  "/users/register",
  validation(joiUserSchema),
  ctrlWrapper(ctrl.register)
);

router.post(
  "/users/login",
  validation(joiLoginSchema),
  ctrlWrapper(ctrl.login)
);

router.post("/users/logout", auth, ctrlWrapper(ctrl.logout));

module.exports = router;
