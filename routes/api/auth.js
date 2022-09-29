const { Router } = require("express");
const {
  validation,
  controllerWrapper: ctrlWrap,
  auth,
} = require("../../middlewares");
const {
  joiLoginSchema,
  joiRegisterSchema,
  subscriptionSchema,
} = require("../../models/user");

const { authController: ctrl } = require("../../controllers");

const router = Router();

router.post(
  "/register",
  validation(joiRegisterSchema),
  ctrlWrap(ctrl.register)
);

router.post("/login", validation(joiLoginSchema), ctrlWrap(ctrl.login));

router.get("/current", ctrlWrap(auth), ctrlWrap(ctrl.getCurrent));

router.get("/logout", ctrlWrap(auth), ctrlWrap(ctrl.logout));

router.patch(
  "/:userId/subscription",
  ctrlWrap(auth),
  validation(subscriptionSchema),
  ctrlWrap(ctrl.updateSubscription)
);

module.exports = router;
