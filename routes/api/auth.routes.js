const express = require("express");
const router = express.Router();
const authController = require("../../controller/auth.controller");


const { upload } = require("../../middlewares/upload");
const { auth } = require("../../middlewares/auth");

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", auth, authController.logout);
router.get("/current", auth, authController.getCurrent);
router.patch("/avatars", auth, upload.single("picture"), authController.updateAvatars);

module.exports = router;