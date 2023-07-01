const express = require("express");
const router = express.Router();

const auth = require("../../config/authorization");

const {
  userLogin,
  userRegister,
  userLogout,
  userCurrent,
  userSubscription,
} = require("../../controller/usersCtrl");

router.post("/login", userLogin);

router.post("/register", userRegister);

router.post("/logout", auth, userLogout);

router.get("/current", auth, userCurrent);

router.patch("/", auth, userSubscription);

module.exports = router;
