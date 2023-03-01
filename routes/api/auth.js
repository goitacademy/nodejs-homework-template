const express = require("express");

const { auth, validation, ctrlWrapper } = require("../../middleware");
const { auth: ctrl } = require("../../controllers");
const { joiRegisterSchema, joiLoginSchema } = require("../../models/user");

const router = express.Router();

router.post(
  "/register",
  validation(joiRegisterSchema),
  ctrlWrapper(ctrl.register)
);
router.post("/login", validation(joiRegisterSchema), ctrlWrapper(ctrl.login));
router.get("/logout", auth, ctrlWrapper(ctrl.logout));
module.exports = router;
