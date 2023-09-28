const express = require("express");
const handlerError = require("../../../middlewears/handlerError");
const router = express.Router();
const upload = require('../../../middlewears/multer')
const auth = require('../../../middlewears/auth')
const userService = require("../api/users");
const validateUser = require("../../../middlewears/validateUser");

router.post("/users/register",validateUser,userService.registerUser);
router.post("/users/login",[validateUser],userService.loginUser)
router.post("/users/logout",auth,userService.logout)
router.get("/users/current",auth,userService.currentUser)
router.patch("/users/avatar",upload.single('avatar'),auth,userService.updateAvatar)
router.get('/users/verify/:verificationToken',userService.verificationUser)
router.post('/users/verify',userService.verificationRepet)
router.use(handlerError);

module.exports = router;
