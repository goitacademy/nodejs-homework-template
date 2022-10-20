const express = require("express");

const { auth: ctrl } = require("../../controllers");

const { ctrlWrapper } = require("../../helpers");

const { schemas } = require("../../models/user");
const { validateBody } = require("../../middlewares");
const router = express.Router();

router.post(
  "/register",
  validateBody(schemas.joiRegisterSchema),
  ctrlWrapper(ctrl.register)
);

module.exports = router;
