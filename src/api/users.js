const express = require("express");
const router = express.Router();
const controllerUsers = require("../controllers/users");
const guard = require("../helpers/guard");
const { createAccountLimiter } = require("../helpers/rate-limit");
//пользователь загружает файл
const upload = require("../helpers/multer");
const {
  validateUploadAvatar,
  validateUpdateSubscription,
} = require("../validation/users");

router.post("/signup", createAccountLimiter, controllerUsers.reg);
router.post("/login", controllerUsers.login);
router.post("/logout", guard, controllerUsers.logout);
router.patch("/", guard, validateUpdateSubscription, controllerUsers.update);
router.patch(
  "/avatars",
  [guard, upload.single("avatar"), validateUploadAvatar],
  controllerUsers.avatars
);

module.exports = router;
