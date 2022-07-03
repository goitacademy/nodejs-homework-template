const express = require("express");

const { authWrapper, validation, ctrlWrapper } = require("../../middlewares");
const { auth: ctrl } = require("../../controllers");
const { joiRegisterSchema, joiLoginSchema } = require("../../models/user.js");

const router = express.Router();

router.post(
  "/signup",
  validation(joiRegisterSchema),
  ctrlWrapper(ctrl.register)
);

router.post("/login", validation(joiLoginSchema), ctrlWrapper(ctrl.login));
router.get("/current", authWrapper, ctrlWrapper(ctrl.getCurrent));
router.get("/logout", authWrapper, ctrlWrapper(ctrl.logout));

module.exports = router;
