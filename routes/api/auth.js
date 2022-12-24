const express = require("express");
const router = express.Router();
const controllers = require("../../controllers/users");
const { userSchemas } = require("../../schemas");
const { validateBody, authenticate } = require("../../middlewares");

router.post(
  "/users/register",
  validateBody(userSchemas.validateUserSchema),
  controllers.register
);

router.post(
  "/users/login",
  validateBody(userSchemas.validateUserSchema),
  controllers.login
);

router.get("/users/current", authenticate, controllers.getCurrent);

router.post("/users/logout", authenticate, controllers.logout);

router.patch(
  "/users/subscription",
  authenticate,
  validateBody(
    userSchemas.updateSubscriptionSchema,
    "Invalid type of subscription"
  ),
  controllers.updateSubscription
);

module.exports = router;
