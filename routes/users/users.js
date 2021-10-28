const express = require("express");
const router = express.Router();
const {
  userRegistration,
  userLogin,
  userLogout,
} = require("../../controllers/users");
const guard = require("../../helpers/guard");

router.post("/signup", userRegistration);
router.post("/login", userLogin);
router.post("/logout", guard, userLogout);

module.exports = router;
