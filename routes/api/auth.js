const express = require("express");
const path = require("path");
const router = express.Router();

const authController = require("../../controller/auth/users");
const fs = require("fs/promises");
const { validateAuth } = require("../../middlewares/validation");
const authenticate = require("../../middlewares/authenticate");

const upload = require("../../middlewares/upload");

router.post("/register", validateAuth, authController.register);
router.post("/login", validateAuth, authController.login);
router.get("/logout", authenticate, authController.logout);
router.get("/current", authenticate, authController.currentUser);

router.patch("/avatars", upload.single("avatar"), authController.updateAvatar);

router.get("/verify/:verificationToken", authController.verify);

router.post("/verify", authController.reSend);
module.exports = router;
