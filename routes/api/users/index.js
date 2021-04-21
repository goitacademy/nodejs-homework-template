const express = require("express");
const router = express.Router();
const usersController = require("../../../controllers/usersController");
const validate = require("./validation");
const guard = require("../../../helpers/guard");
const { createAccountLimiter } = require("../../../helpers/rate-limit-reg");

router.post(
  "/registration",
  createAccountLimiter,
  validate.registration,
  usersController.registration
);
router.patch(
  "/:id",
  validate.updateSubscription,
  usersController.updateSubscriptionById
);
router.post("/login", validate.login, usersController.login);
router.post("/logout", guard, usersController.logout);

module.exports = router;
