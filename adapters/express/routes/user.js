const express = require("express");
const handlerError = require("../../../middlewears/handlerError");
const router = express.Router();
const userService = require("../api/users");
const validateUser = require("../../../middlewears/validateUser");
router.post("/users/register", validateUser, userService.registerUser);
router.post("/user/login",validateUser,userService.loginUser)
router.use(handlerError);

module.exports = router;
