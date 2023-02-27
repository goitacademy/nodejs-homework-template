const express = require("express");
const { current } = require("../../controllers");
const { users } = require("../../controllers");

const auth = require("../../middleware/auth");
const upload = require("../../middleware/upload");

const router = express.Router();
router.get("/current", auth, current.getCurrent);
router.patch("/avatars", auth, upload.single("avatars"), users.avatars);

module.exports = router;
