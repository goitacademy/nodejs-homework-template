const express = require("express");
const router = express.Router();
const { getAll } = require("../controllers/contact.controller");

router.get("/", getAll);

module.exports = router;
