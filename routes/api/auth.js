const express = require("express");
const authControllers = require("../../controllers/auth");
const { userSchema } = require("../../models");
const { validationBody, authenticate } = require("../../middlewares");
const { controllerlWrapper } = require("../../helpers");
const router = express.Router();

router.post("/users/signup", validationBody(userSchema.registerSchema), controllerlWrapper(authControllers.register));
router.post("/users/login", validationBody(userSchema.loginSchema), controllerlWrapper(authControllers.login));
router.get("/users/logout", authenticate, controllerlWrapper(authControllers.logout));
router.get("/users/current", authenticate, controllerlWrapper(authControllers.currentUser));
router.patch(
  "/users",
  authenticate,
  validationBody(userSchema.updateUserSubscriptionSchema),
  controllerlWrapper(authControllers.updateUserSubscription)
);

module.exports = router;
