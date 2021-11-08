const express = require("express");
const router = express.Router();
const fs = require("fs/promises");
const { upload } = require("../../utils");
const { avatars } = require("../../controllers");
const { controller, authorization } = require("../../middlewares");

router.patch("/", authorization(), upload.single("image"), controller(avatars.update));

module.exports = router;
