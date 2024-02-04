const express = require("express");

const UserController = require("../../controllers/user");

// const uploadMiddleware = require("../../middleware/upload");

const router = express.Router();

// router.get("/avatar", UserController.getAvatar);
router.patch(
  "/avatar",
//   uploadMiddleware.single("avatar"),
  UserController.uploadAvatar
);

module.exports = router;