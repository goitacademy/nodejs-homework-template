const express = require("express");
const router = express.Router();
const {
  registration,
  login,
  logout,
  uploadAvatar,
  getUser,
  verifyUser,
  repeatEmailForVerifyUser,
} = require("../../controllers/users");
const guard = require("../../helpers/guard");
const loginLimit = require("../../helpers/rate-limit-login");
const upload = require("../../helpers/uploads");
const wrapError = require("../../helpers/errorHandler");

router.post("/registration", registration);
router.post("/login", loginLimit, login);
router.post("/logout", guard, logout); //проверяем зарегестрирован или нет пользователь и только тогда его разлогиниваем
router.get("/current", guard, getUser);
router.patch("/avatar", guard, upload.single("avatar"), uploadAvatar);

router.get("/verify/:token", wrapError(verifyUser));
router.post("/verify", repeatEmailForVerifyUser);

module.exports = router;
