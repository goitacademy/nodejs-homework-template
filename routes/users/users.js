const express = require("express");
const router = express.Router();
const {
  userRegistration,
  userLogin,
  userLogout,
} = require("../../controllers/users");
const guard = require("../../helpers/guard");
const limitLogin = require("../../helpers/rate-limit-login");

router.post("/signup", userRegistration);
router.post("/login", limitLogin, userLogin);
router.post("/logout", guard, userLogout);

module.exports = router;
