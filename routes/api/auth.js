const express = require("express");
const router = express.Router();

const { auth, validation, ctrlWrapper } = require("../../middlewares");
const { auth: ctrl } = require("../../controllers");
const {
  joiUserSchema,
  updateSubscriptionSchema,
} = require("../../models/user");

router.post("/singup", validation(joiUserSchema), ctrlWrapper(ctrl.singUp));
router.post("/singin", validation(joiUserSchema), ctrlWrapper(ctrl.singIn));
router.get(
  "/singout",
  auth,
  validation(joiUserSchema),
  ctrlWrapper(ctrl.singOut)
);
router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));
router.patch(
  "/",
  auth,
  validation(updateSubscriptionSchema),
  ctrlWrapper(ctrl.updateSubscription)
);

module.exports = router;
