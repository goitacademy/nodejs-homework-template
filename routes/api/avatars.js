const express = require("express");
const router = express.Router();
const Ctrl = require("../../controllers/avatars");

router.patch("/", Ctrl.avatar);

module.exports = router;