const express = require("express");
const router = express.Router();
const upload = require("../../public/index");


const upload = require("../../public/index");

const {
  login,
  register,
  logout,
  getCurrent,
  changeAvatar,
  verify,
  resendVerification,
  changeAvatar,

} = require("../../controller/users.js");

router.post("/login", login);

router.post("/signup", register);

router.get("/logout", logout);

router.get("/current", getCurrent);


router.patch("/avatars", upload.single("picture"), changeAvatar);

router.get("/verify:verificationToken", verify);

router.post("/verify", resendVerification);


router.patch("/avatars", upload.single("picture"), changeAvatar);



module.exports = router;
