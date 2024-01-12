const express = require("express");
const { validateBody, aunthenficate } = require("../../middlewares");
const { userSchema, userSubscriptionSchema } = require("../../models/user");

const router = express.Router();

const ctrl = require("../../controllers/auth");

router.post("/register", validateBody(userSchema), ctrl.registerUser);

router.post("/login", validateBody(userSchema), ctrl.loginUser);

router.get("/current", aunthenficate, ctrl.getCurrentUser);

router.post("/logout", aunthenficate, ctrl.logoutUser);

router.patch(
  "/",
  aunthenficate,
  validateBody(userSubscriptionSchema),
  ctrl.updateSubscription
);
