const express = require("express");

const { validationBody } = require("../../middlewares");

const { ctrlWrapper } = require("../../helpers");

const ctrl = require("../../controllers/auth");

const { joiUsersSchemas } = require("../../models/user");

const router = express.Router();

router.post(
  "/signup",
  validationBody(joiUsersSchemas.joiRegisterSchema),
  ctrlWrapper(ctrl.signup)
);

router.post(
  "/signin",
  validationBody(joiUsersSchemas.joiLoginSchema),
  ctrlWrapper(ctrl.signin)
);

module.exports = router;
