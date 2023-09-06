const express = require("express");
const { validationBody, authenticate, upload } = require("../../middlewares");
const {
  register,
  login,
  currentUser,
  logOut,
  updateSubscription,
  updateAvatar,
} = require("../../api/contacts/auth");

const { schemas } = require("../../models/user");

const router = express.Router();

router.patch("/", authenticate, updateSubscription);
router.patch("/avatars", authenticate, upload.single("avatar"), updateAvatar);
router.post("/register", validationBody(schemas.registerSchema), register);
router.post("/login", validationBody(schemas.loginSchema), login);
router.post("/logout", authenticate, logOut);
router.get("/current", authenticate, currentUser);

module.exports = router;
