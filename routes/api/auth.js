const express = require("express");
const { auth, validation, ctrlWrapper } = require("../../middlewares");
const { joiSchema } = require("../../models/user");
const { auth: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));
router.post("/signup", validation(joiSchema), ctrlWrapper(ctrl.signup));
router.post("/login", validation(joiSchema), ctrlWrapper(ctrl.login));
router.get("/logout", auth, ctrlWrapper(ctrl.logout));
router.patch(
  "/",
  auth,
  validation(joiSchema),
  ctrlWrapper(ctrl.updateSubscription)
);

module.exports = router;
