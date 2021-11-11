const express = require("express");

const { auth: ctrl } = require("../../controllers");

const { validation, controllerWrapper } = require("../../middlewares");
const { authJoiSchema } = require("../../validations");

const router = express.Router();

router.post(
  "/register",
  validation(authJoiSchema),
  controllerWrapper(ctrl.register)
);

router.post("/login", validation(authJoiSchema), controllerWrapper(ctrl.login));

module.exports = router;
