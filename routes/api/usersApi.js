const express = require("express");
const router = express.Router();
const ctrlUser = require("../../controller/usersController");
const authorization = require("../../tools/authorization");
const uploadPicture = require("../../tools/uploadPicture");

router.post("/signup", ctrlUser.signUp);
router.post("/login", ctrlUser.logIn);
router.get("/logout", authorization, ctrlUser.logOut);
router.get("/current", authorization, ctrlUser.current);
router.patch("/", authorization, ctrlUser.changeSubscription);
router.patch(
  "/avatars",
  authorization,
  uploadPicture("avatar"),
  ctrlUser.avatar
);
router.get("/verify/:verificationToken", ctrlUser.emailVerification);
router.post("/verify", ctrlUser.resendEmailVerification);

module.exports = router;
