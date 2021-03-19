const express = require("express");
const router = express.Router();
const usersController = require("../../../controllers/usersController");
const validate = require("./validation.js");
const guard = require("../../../helpers/guard");
const upload = require("../../../helpers/upload");
const { regLimiter } = require("../../../helpers/rate-limit-reg");

router.post(
  "/auth/register",
  regLimiter,
  validate.userRegistation,
  usersController.reg
);
router.post("/auth/login", validate.userLogin, usersController.login);
router.post("/auth/logout", guard, usersController.logout);
router.get("/current", guard, usersController.current);
router.patch(
  "/avatars",
  guard,
  upload.single("avatar"),
  validate.uploadAvatar,
  usersController.avatars
);

module.exports = router;
