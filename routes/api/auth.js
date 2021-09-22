const express = require("express");

const { auth: ctrl } = require("../../controllers");
const { joiSchema } = require("../../models/user");
const {
  authentication,
  validation,
  controllerWrapper,
} = require("../../middlewares");

const router = express.Router();

router.post("/signup", validation(joiSchema), controllerWrapper(ctrl.signup));

router.post("/login", validation(joiSchema), controllerWrapper(ctrl.login));

router.get(
  "/current",
  controllerWrapper(authentication),
  controllerWrapper(ctrl.current)
);

router.get(
  "/logout",
  controllerWrapper(authentication),
  controllerWrapper(ctrl.logout)
);

module.exports = router;
