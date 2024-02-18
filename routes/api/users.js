const express = require("express");
const passport = require("passport");
const ctrlUser = require("../../controller/users");
require("../../config/config-passport");

const router = express.Router();

router.post("/users/signup", ctrlUser.registerUser);

router.post("/users/login", ctrlUser.loginUser);

router.get(
  "/users/logout",
  passport.authenticate("jwt", { session: false }),
  ctrlUser.logoutUser
);

router.get(
  "/users/current",
  passport.authenticate("jwt", { session: false }),
  ctrlUser.checkCurrentUser
);

router.patch(
  "/users",
  passport.authenticate("jwt", { session: false }),
  ctrlUser.updateUserSubscription
);

module.exports = router;
