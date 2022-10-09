const express = require("express");

const ctrl = require("../../controllers/auth");

const { auth } = require("../../middlewares");

const router = express.Router();

router.post("/signup", ctrl.register);

router.post("/login", ctrl.login);

router.get("/current", auth, ctrl.getCurrent);

router.get("/logout", auth, ctrl.logout);

module.exports = router;
