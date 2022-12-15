const express = require("express");

const { validate } = require("../../schema/schema");
const { contact, favoriteJoySchema } = require("../../schema/midleware");

const router = express.Router();

router.post("./signup");

module.exports = router;
