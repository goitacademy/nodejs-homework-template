const express = require("express");
const router = express.Router();

const { authVerifyToken, joiValidation, ctrlWrapper, upload } = require("../../middleware");
const { users: ctrl } = require("../../controllers");
const { joiUpdateUserSchema } = require("../../models/user");
const validateJoiMiddleware = joiValidation(joiUpdateUserSchema);


router.get("/current", authVerifyToken, ctrlWrapper(ctrl.getCurrent));
router.patch("/subscribe", authVerifyToken, validateJoiMiddleware, ctrlWrapper(ctrl.updateSubscribe));
router.patch("/avatars", upload.single("avatar"));
// router.patch("/avatars", upload.single("avatar"), authVerifyToken, validateJoiMiddleware, ctrlWrapper(ctrl.updateSubscribe));


module.exports = router;
