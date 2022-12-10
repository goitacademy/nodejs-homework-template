const express = require("express");
const {
  registration,
  login,
  getCurrentUserInfo,
  logOut,
  avatarPatchController,
  upload,
} = require("../../models/users");
const auth = require("../../middleware/auth");
const {
  userRegDataValidationSchema,
} = require("../../middleware/validationContacts");

const router = express.Router();

router.post("/signup", userRegDataValidationSchema, registration);

router.patch("/avatars", auth, upload.single("avatar"), avatarPatchController);

router.post("/login", userRegDataValidationSchema, login);

router.get("/current", auth, getCurrentUserInfo);

router.get("/logout", auth, logOut);

module.exports = router;
