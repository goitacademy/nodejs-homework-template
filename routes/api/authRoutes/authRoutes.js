const express = require("express");

const router = express.Router();
const { authCheck } = require("../../../middlewares/authHandler");
const { upload } = require("../../../middlewares/avatarsMiddleware");
const validateBody = require('../../../decorators')
const schemas = require('../../../schemas/validation')
const AuthController = require("./authController");

// router.use()

router.post("/register", validateBody(schemas.userRegisterValidation), AuthController.userRegister);
router.get('/verify/:verificationCode', AuthController.userVerification);
router.get('/resendVerify', validateBody(schemas.emailValidation), AuthController.userResendVerification )
router.post("/login", validateBody(schemas.userLoginValidation), AuthController.userLogin);
router.post("/logout", authCheck, AuthController.userLogout);
router.get("/current", authCheck, AuthController.userCurrent);
router.patch(
  "/avatars",
  upload.single('avatar'),
  authCheck,
  AuthController.updateAvatar
);

module.exports = router;
