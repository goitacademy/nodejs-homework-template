const express = require("express");

const { validation, ctrlWrapper } = require("../../middlewares");
const { auth: ctrl } = require("../../controllers");
const {
  joiUserRegisterSchema,
  joiUserLoginSchema,
} = require("../../Schema/joiContactSchema");

const router = express.Router();

router.post(
  "/register",
  validation(joiUserRegisterSchema),
  ctrlWrapper(ctrl.register)
);

router.post("/login", validation(joiUserLoginSchema), ctrlWrapper(ctrl.login));

module.exports = router;
