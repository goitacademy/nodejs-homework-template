const express = require("express");
const router = express.Router();
const { registration, login, logout } = require("../../controllers/users");
const guard = require("../../helpers/guard");

router.post("/registration", registration);
router.post("/login", login);
router.post("/logout", guard, logout);

module.exports = router;
