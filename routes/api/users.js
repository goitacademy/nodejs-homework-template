const express = require('express');
const {validation, ctrlWrapper, auth, upload} = require("../../middlewares")
const {joiSchema} = require("../../models/user")

const {users: ctrl} = require("../../controllers/index")


const router = express.Router()

router.post("/signup", validation(joiSchema), ctrlWrapper(ctrl.signUp))
router.post("/login", validation(joiSchema), ctrlWrapper(ctrl.login))
router.get("/current", auth, ctrlWrapper(ctrl.getCurrent))
router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verify))
router.post("/verify", ctrlWrapper(ctrl.resendEmail))
router.get("/logout", auth, ctrlWrapper(ctrl.logout))
router.patch("/avatars", auth, upload.single("avatar"), ctrlWrapper(ctrl.updateAvatar))
module.exports = router