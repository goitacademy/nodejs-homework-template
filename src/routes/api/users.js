const express = require("express");
const usersController = require("../../controllers/users");
const router = express.Router();
const { guard } = require("../../helpers/guard");
const { createAccountLimiter } = require("../../helpers/rate-limit");

router
  .post("/signup", createAccountLimiter, usersController.signup)
  .post("/login", usersController.login)
  .post("/logout", guard, usersController.logout)
  .get("/current", guard, usersController.current)
  .patch("/:contactId/subscription", guard, usersController.updateSubscription);

module.exports = router;
