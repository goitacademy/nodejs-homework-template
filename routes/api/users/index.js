const express = require("express");
const router = express.Router();
const controllers = require("../../../controllers/user.controller");
const validation = require("./validation");
const guard = require("../../../helpers/guard");

router.post("/signup", validation.validateLogin, controllers.register);

router.post("/login", validation.validateRegistr, controllers.login);

router.post("/logout", guard, controllers.logout);

router.post("/current", guard, controllers.getCurrentUser);

router.patch(
  "/",
  guard,
  validation.validateSubscriptionUpdate,
  controllers.subscriptionUpdate
);

module.exports = router;
