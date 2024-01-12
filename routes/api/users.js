const express = require("express");
const { validateBody, aunthenficate } = require("../../middlewares");
const { userJoiSchema, userSubscriptionSchema } = require("../../models/user");

const router = express.Router();

const ctrl = require("../../controllers/users");

router.post("/register", validateBody(userJoiSchema), ctrl.registerUser);

router.post("/login", validateBody(userJoiSchema), ctrl.loginUser);

router.get("/current", aunthenficate, ctrl.getCurrentUser);

router.post("/logout", aunthenficate, ctrl.logoutUser);

router.patch(
  "/",
  aunthenficate,
  validateBody(userSubscriptionSchema),
  ctrl.updateSubscription
);

module.exports = router;
