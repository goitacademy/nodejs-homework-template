const express = require("express");

const { tokenValidation } = require("../../middleware");

const { users: ctrl } = require("../../fetch");

const router = express.Router();

router.post("/register", ctrl.signup);
router.post("/login", ctrl.login);
router.get("/current", tokenValidation, ctrl.getCurrentUser);
router.post("/logout", tokenValidation, ctrl.logout);

/*
update subscription "starter", "pro", "business"
*/
router.patch("/", tokenValidation, ctrl.updateSubscription);

module.exports = router;