const express = require("express");
const guard = require("../../helpers/guard");
const { upload } = require("../../helpers/multer");
const controllerUsers = require("../../controlers/userControlers");

const router = express.Router();

router.post("/registration", controllerUsers.reg);
router.post("/login", controllerUsers.login);
router.post("/logout", guard, controllerUsers.logout);

router.patch(
  "/avatars",
  guard,
  upload.single("avatar"),
  controllerUsers.avatars
);

module.exports = router;
