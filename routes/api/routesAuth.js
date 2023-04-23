const express = require("express");

const router = express.Router();

const {
  register,
  login,
  logout,
  currentUser,
  updateSubscription,
  updateAvatar,
} = require("../../controllers/controllersAuth");

const { authenticate, validateAuthBody, upload } = require("../../middleware");

const {
  schemaRegister,
  schemaLogin,
  schemaUpdateSubscription,
} = require("../../models/user");

router.post("/register", validateAuthBody(schemaRegister), register);

router.post("/login", validateAuthBody(schemaLogin), login);

router.get("/current", authenticate, currentUser);

router.post("/logout", authenticate, logout);

router.patch(
  "/",
  authenticate,
  validateAuthBody(schemaUpdateSubscription),
  updateSubscription
);

router.patch("/avatars", authenticate, upload.single("avatar"), updateAvatar);

module.exports = router;
