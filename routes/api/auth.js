const express = require("express");
const {
  signUp,
  signIn,
  logOut,
  current,
  changeSubscription,
} = require("../../controller/auth");
const { authByToken } = require("../../middlewar/authByToken");

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/logout", authByToken, logOut);
router.get("/current", authByToken, current);
router.patch("/users", authByToken, changeSubscription);

module.exports = router;
