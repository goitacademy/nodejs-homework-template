const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getCurrent,
  logout,
  updateSubscription,
} = require("../../controllers/authCtrl");
const authenticate = require("../../middlewares/authenticate");

router.post("/register", register);

router.post("/login", login);

router.get("/current", authenticate, getCurrent);

router.patch("/", authenticate, updateSubscription);

router.post("/logout", authenticate, logout);

module.exports = router;
