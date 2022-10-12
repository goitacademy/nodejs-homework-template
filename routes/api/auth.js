const express = require("express");

const { auth, validationBody } = require("../../middlewares");
const { ctrlWrapper } = require("../../helpers");

// const ctrl = require("../../controllers/auth");
const { auth: ctrl } = require("../../controllers/");

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

router.post("/signout", auth, ctrlWrapper(ctrl.signout));

module.exports = router;
