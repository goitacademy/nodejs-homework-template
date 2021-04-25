const express = require("express");
const router = express.Router();
const controllerUsers = require("../controllers/users");
const guard = require("../helpers/guard");
const { createAccountLimiter } = require("../helpers/rate-limit");
const { validateUpdateSubscription } = require("../validation/users");

router.post("/signup", createAccountLimiter, controllerUsers.reg);
router.post("/login", controllerUsers.login);
router.post("/logout", guard, controllerUsers.logout);
router.patch("/", guard, validateUpdateSubscription, controllerUsers.update);

module.exports = router;
