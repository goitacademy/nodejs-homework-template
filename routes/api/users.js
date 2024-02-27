const express = require("express");
const passport = require("passport");
const ctrlUser = require("../../controller/users");
require("../../config/config-passport");
const uploadFunctions = require("../../config/config-multer");

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

router.patch(
  "/users/avatars",
  passport.authenticate("jwt", { session: false }),
  uploadFunctions.uploadMiddleware.single("avatar"),
  ctrlUser.updateUserAvatar
);

router.get("/users/verify/:verificationToken", ctrlUser.verifyUser);

router.post("/users/verify", ctrlUser.resendVerificationEmail);

module.exports = router;
