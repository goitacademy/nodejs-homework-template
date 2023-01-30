const express = require("express");
const auth = require("../../middlewares/auth");
const router = express.Router();

const { userController } = require("../../controllers");
const {
  usersSignUnValidation,
  usersLogInValidation,
} = require("../../middlewares/userValidationMiddleware");
const upload = require("../../middlewares/upload");

router.post("/signup", usersSignUnValidation, userController.signUp);

router.post("/login", usersLogInValidation, userController.logIn);

router.get("/logout", auth, userController.logOut);

router.get("/current", auth, userController.current);

router.patch("/avatars", auth, upload.single("avatar"), userController.avatar);

// router.patch("/avatar", auth, upload.single("avatar"), userController.avatar);

module.exports = router;
