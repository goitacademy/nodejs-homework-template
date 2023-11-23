const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");

router.patch("avatar/", userController.uploadAvatar);

module.exports = router;
