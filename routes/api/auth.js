const express = require("express");

const { joiSchema, joiSchemaSub } = require("../../models/user");
const {
  validation,
  controllerWrapper,
  authenticate,
} = require("../../middlewares");
const { auth: ctrl } = require("../../controllers");

const router = express.Router();

const userValidationMiddleware = validation(joiSchema);
const subValidationMiddleware = validation(joiSchemaSub);

router.post("/signup", userValidationMiddleware, controllerWrapper(ctrl.reg));

router.post("/login", userValidationMiddleware, controllerWrapper(ctrl.login));

router.post(
  "/logout",
  controllerWrapper(authenticate),
  controllerWrapper(ctrl.logout)
);

router.get(
  "/current",
  controllerWrapper(authenticate),
  controllerWrapper(ctrl.current)
);

router.patch(
  "/",
  controllerWrapper(authenticate),
  subValidationMiddleware,
  controllerWrapper(ctrl.subscription)
);

module.exports = router;
