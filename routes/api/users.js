const express = require("express");
const { users: ctrl } = require("../../controllers/index");

const router = express.Router();

const { validation, auth } = require("../../middlewares");
const { joiSchema, subscriptionJoiSchema } = require("../../models/users");

router.post("/signup", validation(joiSchema), ctrl.signup);
router.post("/login", validation(joiSchema), ctrl.login);
router.get("/current", auth, ctrl.getCurrent);
router.get("/logout", auth, ctrl.logout);
router.patch(
  "/:_id/subscription",
  validation(subscriptionJoiSchema),
  ctrl.updeteSubscription
);

module.exports = router;
