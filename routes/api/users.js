const express = require('express');

const UserController = require("../controller/user")

const router = express.Router();

router.patch("/avatar", UserController.uploadAvatar)  

module.exports = router;