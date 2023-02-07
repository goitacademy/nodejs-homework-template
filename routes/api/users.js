const express = require("express");
const { validation, ctrlWrapper, auth } = require("../../middlewares");
const { joiSchema } = require("../../models/user");
const { updateSubscriptionValidation } = require("../../schemas");
const { users: ctrl } = require("../../controllers");

const router = express.Router();

router.post("/signup", validation(joiSchema), ctrlWrapper(ctrl.signUp));
router.post("/login", validation(joiSchema), ctrlWrapper(ctrl.login));
router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));
router.get("/logout", auth, ctrlWrapper(ctrl.logout));
router.patch(
  "/",
  auth,
  validation(updateSubscriptionValidation),
  ctrlWrapper(ctrl.subscriptionChange)
);

module.exports = router;
