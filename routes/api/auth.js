const express = require("express");
const { ctrlWrapper } = require("../../helpers");
const { validateBody } = require("../../middlewares");
const { userSchemas } = require("../../models");

const router = express.Router();

// const { validateBody, isValidId } = require("../../middlewares");
const { auth: ctrl } = require("../../controllers");

router.post(
  "/register",
  validateBody(userSchemas.registerSchema),
  ctrlWrapper(ctrl.register)
);

router.post(
  "/login",
  validateBody(userSchemas.loginSchema),
  ctrlWrapper(ctrl.login)
);

module.exports = router;
