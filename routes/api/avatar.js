const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/avatars/avatar.jpg", async (req, res, next) => {
  const avatarPath = path.join(__dirname, "../../public/avatars/avatar.jpg");
  res.sendFile(avatarPath);
});

module.exports = router;
