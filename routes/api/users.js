const express = require("express");
const upload = require("../../middlewares/upload");
const { updateAvatar } = require("../../controllers/users");
const auth = require("../../middlewares/auth");

const router = express.Router();

router.patch("/avatars", auth, upload.single("avatar"), updateAvatar);

module.exports = router;
