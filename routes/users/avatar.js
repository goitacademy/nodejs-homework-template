const express = require("express");
const router = express.Router();
const RegisterController = require("../../controllers/users/avatar");

router.patch("/avatar", RegisterController.avatar);

module.exports = router;
