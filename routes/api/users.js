const express = require("express");
const router = express.Router();

const { users: ctrl } = require("../../controllers");
const { auth } = require("../../middlewares");

router.post("/register", ctrl.register);

router.post("/login", ctrl.login);

router.get("/current", auth, ctrl.getCurrent);

module.exports = router;
