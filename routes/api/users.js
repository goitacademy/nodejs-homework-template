const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  logout,
  userCurrent,
  updateUserSubscription,
} = require("../../controllers");
const auth = require("../../middlewares/auth");

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", auth, logout);
router.get("/current", auth, userCurrent);
router.patch("/", auth, updateUserSubscription);

module.exports = router;
