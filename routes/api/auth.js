const express = require("express");

const { auth: ctrl } = require("../../controllers");

const { ctrlWrapper } = require("../../helpers");

const { schemas } = require("../../models/user");
const { auth, validateBody } = require("../../middlewares");
const router = express.Router();

router.post(
  "/register",
  validateBody(schemas.joiRegisterSchema),
  ctrlWrapper(ctrl.register)
);

router.post(
  "/login",
  validateBody(schemas.joiLoginSchema),
  ctrlWrapper(ctrl.login)
);

router.get("/logout", auth, ctrlWrapper(ctrl.logout));

module.exports = router;
