const express = require("express");
const router = express.Router();
const user = require("../../controllers/usersAvatar");
const { storage } = require("../../middlewares/upload");

router.patch("/avatars", storage.single("avatar"), user.updateUserAvatar);

module.exports = router;
