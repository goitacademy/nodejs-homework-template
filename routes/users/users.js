const express = require("express");
const router = express.Router();
const guard = require("../../helpers/guard");

const loginLimit = require("../../helpers/rate-limit-login");
const upload = require("../../helpers/uploads");
const {
  signup,
  login,
  logout,
  current,
  updateSubUser,
  uploadAvatar,
} = require("../../controllers/users.js");

const {
  validateUser,
  validateLoginUser,
  validateUpdateSub,
} = require("./validation");

router.post("/signup", validateUser, signup);
router.post("/login", loginLimit, validateLoginUser, login);
router.post("/logout", guard, logout);
router.get("/current", guard, current);
router.patch("/", guard, validateUpdateSub, updateSubUser);
router.patch("/avatar", guard, upload.single("avatar"), uploadAvatar);

module.exports = router;
