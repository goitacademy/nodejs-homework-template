const express = require("express");
const UserController = require("../../controllers/userController");

const router = express.Router();

router.patch("/avatar", UserController.uploadAvatar);

module.exports = router;
