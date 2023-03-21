const express = require("express");

const { auth, validation, ctrlWrapper } = require("../../middlewares");
const { auth: ctrl } = require("../../controllers");
const { joiRegisterSchema, joiLoginSchema } = require("../../utils/validation");

const router = express.Router();

router.post(
  "/register",
  validation(joiRegisterSchema),
  ctrlWrapper(ctrl.register)
);

router.post("/login", validation(joiLoginSchema), ctrlWrapper(ctrl.login));
router.get("/logout", auth, ctrlWrapper(ctrl.logout));

module.exports = router;
