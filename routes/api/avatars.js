const express = require("express");
const imageController = require("../../controller/avatars");
const router = express.Router();
const { auth } = require("../../middlewares/auth");
const upload = require("../../middlewares/upload");

router.patch("/avatars", auth, upload.single("avatar"), imageController);
module.exports = router;
