const express = require("express");
const router = express.Router();
const { ctrlWrapper, validation } = require("../../middlewares");
const { auth: ctrl } = require("../../controllers");
const { joiRegisterSchema } = require("../../models/user");

router.post(
  "/register",
  validation(joiRegisterSchema),
  ctrlWrapper(ctrl.register)
);

module.exports = router;
