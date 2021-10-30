const express = require("express");

const {
  joiSchema,
  joiSchemaSub,
  joiSchemaVerify,
} = require("../../models/user");
const {
  validation,
  controllerWrapper,
  authenticate,
  upload,
} = require("../../middlewares");
const { auth: ctrl } = require("../../controllers");

const router = express.Router();

const userValidationMiddleware = validation(joiSchema);
const subValidationMiddleware = validation(joiSchemaSub);
const verifyValidationMiddleware = validation(joiSchemaVerify);

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

router.patch(
  "/avatars",
  controllerWrapper(authenticate),
  upload.single("avatar"),
  controllerWrapper(ctrl.updateAvatar)
);

router.get("/verify/:verifyToken", controllerWrapper(ctrl.verify));

router.post(
  "/verify",
  verifyValidationMiddleware,
  controllerWrapper(ctrl.reVerify)
);

module.exports = router;
