const express = require("express");
const router = express.Router();

const { users: ctrl } = require("../../controllers");
const { auth } = require("../../middlewares");

router.post("/register", ctrl.register);

router.post("/login", ctrl.login);

router.post("/logout", auth, ctrl.logout);

router.get("/current", auth, ctrl.getCurrent);

router.patch("/", auth, ctrl.updateSubscriptionUser);

module.exports = router;
