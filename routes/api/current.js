const express = require("express");
const { current } = require("../../controllers");
const auth = require("../../middleware/auth");
const router = express.Router();
router.get("/current", auth, current.getCurrent);
module.exports = router;
