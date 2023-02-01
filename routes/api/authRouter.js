const express = require("express");
const router = express.Router();

const { asyncWrapper } = require("../../helpers");
const { validation, auth } = require("../../middlewares");
const { joiRegisterSchema, joiLoginSchema } = require("../../models");

const { auth: ctrl } = require("../../controllers");

router.post(
  "/signup",
  validation(joiRegisterSchema),
  asyncWrapper(ctrl.signup)
);

router.post("/login", validation(joiLoginSchema), asyncWrapper(ctrl.login));

router.get("/current", auth, asyncWrapper(ctrl.getCurrent));

router.get("/logout", auth, asyncWrapper(ctrl.logout));

module.exports = { authRouter: router };
