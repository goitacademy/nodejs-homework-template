const express = require("express");

const auth = require("../../controllers/auth");
const { authenticate, upload } = require("../../middlewares");

const router = express.Router();

router.post("/register", auth.register);

router.post("/login", auth.login);

router.get("/current", authenticate, auth.current);

router.post("/logout", authenticate, auth.logout);

router.patch("/avatars", authenticate, upload.single("avatar", auth.changeAvatar), auth.changeAvatar);

module.exports = router;
