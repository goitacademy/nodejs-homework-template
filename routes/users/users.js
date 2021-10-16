const express = require("express");
const router = express.Router();
const {
  userRegistration,
  userLogin,
  userLogout,
} = require("../../controllers/users");

router.post("/signup", userRegistration);
router.post("/login", userLogin);
router.post("/logout", userLogout);

module.exports = router;
