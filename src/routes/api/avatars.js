const express = require("express");
const path = require("path");

const FILE_PATH = path.resolve("./public/avatars");

const router = express.Router();

router.use("/", express.static(FILE_PATH));

module.exports = router;
