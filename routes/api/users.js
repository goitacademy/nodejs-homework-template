const express = require("express");
const router = express.Router();
const {
  login,
  register,
  logout,
  getCurrent,
} = require("../../controller/users.js");

router.post("/login", login);

router.post("/signup", register);

router.get("/logout", logout);

router.get("/current", getCurrent);

module.exports = router;
