const express = require("express");

const { authenticate, validateSchema } = require("../../middlewares");
const { ctrlWrapper } = require("../../helpers");
const { auth: ctrl } = require("../../controllers");
const { schemas } = require("../../schemas/schemasValidation");

const router = express.Router();

router.post(
  "/signup",
  validateSchema(schemas.registerSchema),
  ctrlWrapper(ctrl.register)
);

router.post(
  "/login",
  validateSchema(schemas.loginSchema),
  ctrlWrapper(ctrl.login)
);

router.post("/logout", authenticate, ctrlWrapper(ctrl.logout));

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));

router.patch(
  "/",
  validateSchema(schemas.subscriptionSchema),
  authenticate,
  ctrlWrapper(ctrl.updateSubscription)
);

module.exports = router;
