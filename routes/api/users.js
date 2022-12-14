const express = require("express");
const {
  registration,
  login,
  getCurrentUserInfo,
  logOut,
  registrationVerification,
  avatarPatchController,
} = require("../../models/users");
const auth = require("../../middleware/auth");
const path = require("path");
const {
  userRegDataValidationSchema,
} = require("../../middleware/validationContacts");
const uploadFile = require("../../services/multer/multerService");

const destinationPath = path.resolve("./tmp");
const upload = uploadFile(destinationPath);

const router = express.Router();

router.post("/signup", userRegDataValidationSchema, registration);

router.patch("/avatars", auth, upload.single("avatar"), avatarPatchController);

router.get("verify/:verificationToken", registrationVerification);

router.post("/login", userRegDataValidationSchema, login);

router.get("/current", auth, getCurrentUserInfo);

router.get("/logout", auth, logOut);

module.exports = router;
