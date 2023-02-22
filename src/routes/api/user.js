const express = require("express");
const router = express.Router();

const { authVerifyToken, joiValidation, ctrlWrapper, upload } = require("../../middleware");
const { users: ctrl } = require("../../controllers");
const { joiUpdateUserSchema, verifyEmailSchema } = require("../../models/user");
const validateJoiMiddleware = joiValidation(joiUpdateUserSchema);
const validateVerifyEmail = joiValidation(verifyEmailSchema);


router.post("/verify", validateVerifyEmail, ctrlWrapper(ctrl.resendVerifyEmail));
router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));
router.get("/current", authVerifyToken, ctrlWrapper(ctrl.getCurrent));
router.patch("/subscribe", authVerifyToken, validateJoiMiddleware, ctrlWrapper(ctrl.updateSubscribe));
router.patch("/avatars", authVerifyToken, upload.single("avatar"), ctrlWrapper(ctrl.updateAvatar));




module.exports = router;
