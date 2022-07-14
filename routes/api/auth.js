const express = require("express")

const ctrl = require("../../controllers/auth")

const {ctrlWrapper, validation, authenticate, upload} = require("../../middleware")

const {schemas} = require("../../models/user")


const router = express.Router()

router.post("/register", validation(schemas.register), ctrlWrapper(ctrl.register))

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail))

router.post("/verify", validation(schemas.email), ctrlWrapper(ctrl.resendVerifyEmail))

router.post("/login", validation(schemas.login), ctrlWrapper(ctrl.login))

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent))

router.get("/logout", authenticate, ctrlWrapper(ctrl.logout))

router.patch("/avatars", authenticate, upload.single("avatar"), ctrlWrapper(ctrl.updateAvatar))

module.exports = router