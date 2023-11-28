const express = require("express");
const router = express.Router();
const UsersController = require("../../controllers/users/index.js");
const jsonParser = express.json();
const author = require("../../middleware/author");
const { validateUsers } = require("../../helpers");
const upload = require("../../middleware/upload.js");
router.post("/register", jsonParser, validateUsers, UsersController.register);
router.post("/login", jsonParser, validateUsers, UsersController.login);
router.post("/logout", author, UsersController.logout);
router.get("/current", author, UsersController.getCurrent);
router.patch(
  "/avatars",
  upload.single("avatar"),
  author,
  UsersController.uploadAvatar
);
module.exports = router;
