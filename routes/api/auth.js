const express = require("express");
const { ctrlWrapper, validation, auth } = require("../../middlewares");
const { authRegisterSchema, authLoginSchema } = require("../../schema");

const { auth: ctrl } = require("../../contlollers");

const router = express.Router();

router.post(
  "/register",
  validation(authRegisterSchema),
  ctrlWrapper(ctrl.register)
);

router.post("/login", validation(authLoginSchema), ctrlWrapper(ctrl.login));

router.get("/logout", auth, ctrlWrapper(ctrl.logout));

module.exports = router;
