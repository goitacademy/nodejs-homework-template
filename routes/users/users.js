const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  logout,
  currentUser,
  updateSubscription,
  uploadAvatar,
} = require("../../controllers/users");

const {
  validateCreateUser,
  validateLogin,
  validateUpdateSubscription,
} = require("./validation");

const guard = require("../../helpers/guard");
const loginLimit = require("../../helpers/rate-limit-login");
const upload = require("../../helpers/uploads");

router.post("/signup", validateCreateUser, signup);

router.post("/login", validateLogin, loginLimit, login);

router.post("/logout", guard, logout);

router.get("/current", guard, currentUser);

router.patch(
  "/subscription",
  guard,
  validateUpdateSubscription,
  updateSubscription
);

router.patch("/avatars", guard, upload.single("avatar"), uploadAvatar);

module.exports = router;