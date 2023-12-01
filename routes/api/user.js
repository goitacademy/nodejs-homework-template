const express = require("express");
const UserController = require("../../controllers/userController");
const upload = require("../../middlewares/upload");

const router = express.Router();

router.patch("/avatars", upload.single("avatar"), UserController.uploadAvatar);


module.exports = router;
 