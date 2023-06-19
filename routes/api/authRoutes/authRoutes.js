const express = require("express");

const router = express.Router();
const { authCheck } = require("../../../middlewares/authHandler");
const {upload} = require("../../../middlewares/avatarsMiddleware");

const AuthController = require("./authController");

// router.use()

router.post("/register", AuthController.userRegister);
router.post("/login", AuthController.userLogin);
router.post("/logout", authCheck, AuthController.userLogout);
router.get("/current", authCheck, AuthController.userCurrent);
router.patch(
  "/avatars",
  upload.single('avatar'),
  authCheck,
  AuthController.updateAvatar
);

module.exports = router;
