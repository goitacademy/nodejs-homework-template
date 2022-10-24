const express = require("express");

const { ctrlWrapper } = require("../../helpers");
const { auth, validation } = require("../../middlewares");
const { userJoiSchema } = require("../../schemas");
const { users: ctrl } = require("../../controllers");


const router = express.Router();

router.post(
  "/register",
  validation(userJoiSchema.userSchema),
  ctrlWrapper(ctrl.register)
);

router.post(
  "/login",
  validation(userJoiSchema.userSchema),
  ctrlWrapper(ctrl.login)
);

router.post("/logout", auth, ctrlWrapper(ctrl.logout));

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

router.patch("/", validation(userJoiSchema.subscriptionSchema), auth, ctrlWrapper(ctrl.updateSubscription));

module.exports = router;