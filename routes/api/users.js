const express = require("express");

const { auth, ctrlWrapper, validation } = require("../../middlewares");
const { users: ctrl } = require("../../controllers");
const { joiUpdateSubscription } = require("../../models/user");

const router = express.Router();

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));
router.patch(
  "/",
  auth,
  validation(joiUpdateSubscription),
  ctrlWrapper(ctrl.updateSubscription)
);

module.exports = router;
