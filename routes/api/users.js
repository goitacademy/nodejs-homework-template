const express = require("express");
const router = express.Router();
const ctrUser = require("../../models/users");

router.post("/singup", ctrUser.signup);

router.post("/login", ctrUser.login);

module.exports = router;
