const express = require('express');
const router = express.Router();
const ctrl = require("../../../controllers/users.js");
const guard = require("../../../helpers/guard");
const {
  validateSubscription
} = require("./validation");

router.post("/signup", ctrl.signup);
router.post("/login", ctrl.login);
router.get("/current", guard, ctrl.current);
router.post("/logout", guard, ctrl.logout);
router.patch("/", guard, validateSubscription, ctrl.subscription);

module.exports = router;