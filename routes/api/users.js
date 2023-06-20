const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/users");

const { authenticate } = require("../../middlewares");

router.post("/register", ctrl.register);

router.post("/login", ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch("/", authenticate, ctrl.updateSubscription);

module.exports = router;
