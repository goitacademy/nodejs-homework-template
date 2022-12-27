const express = require("express");
const router = express.Router();
const { auth: ctrl } = require("../../controllers");
const { ctrlWrapper, validateSchema, auth } = require("../../middlewares");
const {
  registerUserSchema,
  loginUserSchema,
  changeSubscriptionSchema,
} = require("../../models/user");

router.post(
  "/register",
  validateSchema(registerUserSchema),
  ctrlWrapper(ctrl.register)
);
router.post("/login", validateSchema(loginUserSchema), ctrlWrapper(ctrl.login));
router.get("/logout", auth, ctrlWrapper(ctrl.logout));
router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));
router.patch(
  "/subscription",
  auth,
  validateSchema(changeSubscriptionSchema),
  ctrlWrapper(ctrl.changeSubscription)
);

module.exports = router;
