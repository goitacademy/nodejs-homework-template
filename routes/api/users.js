const express = require("express");

const { validation, ctrlWrapper } = require("../..//middleware");
const { users: ctrl } = require("../../controllers/");
const { joiRegisterSchema, joiLoginSchema } = require("../../models");

const router = express.Router();

router.post(
  "/register",
  validation(joiRegisterSchema),
  ctrlWrapper(ctrl.register)
);

module.exports = router;
