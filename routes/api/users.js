const express = require("express");

const { authenticate } = require("../../middlewares");

const router = express.Router();

const ctrl = require("../../controllers/users");

router.post("/register", ctrl.register);

router.post("/login", ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

module.exports = router;
