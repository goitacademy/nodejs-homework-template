const express = require("express");
const router = express.Router();
const { ctrlWrapper, auth } = require("../../middlewares");
const { users } = require("../../controllers");

router.get("/current", auth, ctrlWrapper(users));

module.exports = router;
