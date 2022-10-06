const express = require("express");
const ctrl = require("../../controllers/auth");

const { ctrlWrapper } = require("../../helpers/");
const { validateBody } = require("../../middlewares");
const { schemas } = require("../../models/user");

const router = express.Router();

router.post(
  "/signup",
  validateBody(schemas.signupSchema),
  ctrlWrapper(ctrl.signup)
);

module.exports = router;
