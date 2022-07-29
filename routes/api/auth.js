const express = require("express");
const router = express.Router();
const { auth, ctrlWrapper, validation } = require("../../middlewares");
const { auth: ctrl } = require("../../controllers");
const { joiRegisterSchema, joiLoginSchema } = require("../../models/user");

router.post(
  "/register",
  validation(joiRegisterSchema),
  ctrlWrapper(ctrl.register)
);

router.post("/login", validation(joiLoginSchema), ctrlWrapper(ctrl.login));

router.get("/logout", auth, ctrlWrapper(ctrl.logout));
module.exports = router;
