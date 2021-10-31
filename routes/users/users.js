const express = require("express");
const router = express.Router();
const {
  userRegistration,
  userLogin,
  userLogout,
} = require("../../controllers/users");
const guard = require("../../helpers/guard");
const limitLogin = require("../../helpers/rate-limit-login");
const wrapError = require("../../helpers/errorhendler");

router.post("/signup", wrapError(userRegistration));
router.post("/login", limitLogin, wrapError(userLogin));
router.post("/logout", guard, wrapError(userLogout));

module.exports = router;
