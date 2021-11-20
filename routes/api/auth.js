const express = require("express");

const { validation400, controllerWrapper } = require("../../middlewares");
const { auth: ctrl } = require("../../controllers");
const { joiSchema } = require("../../model/user");

const router = express.Router();

router.post(
  "/register",
  validation400(joiSchema),
  controllerWrapper(ctrl.register)
);

router.post("/login", validation400(joiSchema), controllerWrapper(ctrl.login));

module.exports = router;
