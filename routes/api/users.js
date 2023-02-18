const express = require("express");
const { authToken,upload, ctrlWrapper } = require("../../middlewares");
const { users: ctrl } = require("../../controllers");
const router = express.Router();

router.get("/current", authToken, ctrlWrapper(ctrl.getCurrent));
router.patch("/avatars",authToken,upload.single('avatar'), ctrlWrapper(ctrl.updateAvatar));
module.exports = router;
