const express = require("express");
const auth = require("../../middleware/auth");
const upload = require("../../middleware/upload")

const {
  crtlRegisterUser,
  crtlLoginUser,
  ctrlLogoutUser,
  ctrlCurrentUser,
  uploadAndPatchAvatar,
} = require("../../controllers/users");

const router = express.Router();

router.post("/register", crtlRegisterUser);

router.post("/login", crtlLoginUser);

router.post("/logout", auth, ctrlLogoutUser);

router.get("/current", auth, ctrlCurrentUser);

router.patch("/avatars", auth, upload.single("avatar"), uploadAndPatchAvatar);

module.exports = router;
