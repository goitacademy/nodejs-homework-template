const express = require("express");

const { validation, ctrlWrapper } = require("../..//middleware");
const { users: ctrl } = require("../../controllers");
const { joiRegisterSchema, joiLoginSchema } = require("../../models/user");

const router = express.Router();

router.post(
  "/register",
  validation(joiRegisterSchema),
  ctrlWrapper(ctrl.register)
);
router.post("/login", validation(joiRegisterSchema), ctrlWrapper(ctrl.login));
module.exports = router;
