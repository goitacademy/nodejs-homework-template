const express = require("express");

const router = express.Router();

router.get("/:avatarId", express.static("./public/avatars"));

module.exports = router;
