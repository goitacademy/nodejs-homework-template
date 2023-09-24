const express = require("express");
const handlerError = require("../../../middlewears/handlerError");
const router = express.Router();
const auth = require('../../../middlewears/auth')
const userService = require("../api/users");
const validateUser = require("../../../middlewears/validateUser");
router.post("/users/register",[ validateUser], userService.registerUser);
router.post("/users/login",[validateUser],userService.loginUser)
router.post("/users/logout",auth,userService.logout)
router.get("/users/current",auth,userService.currentUser)
router.use(handlerError);

module.exports = router;
