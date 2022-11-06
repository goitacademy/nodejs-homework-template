const express = require("express");

const ctrl = require("../../controllers/auth");

const { auth, upload } = require("../../middlewares");

const router = express.Router();

router.post("/signup", ctrl.register);

router.get("/verify/:verificationToken", ctrl.verify);

router.post("/verify", auth, ctrl.verify);

router.post("/login", ctrl.login);

router.get("/current", auth, ctrl.getCurrent);

router.get("/logout", auth, ctrl.logout);

router.patch("/avatars", auth, upload.single("avatar"), ctrl.setAvatar);

module.exports = router;
