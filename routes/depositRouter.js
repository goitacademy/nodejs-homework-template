const express = require("express");
const router = express.Router();

const { depositController } = require("../controllers/depositController");

router.post("/", depositController);

module.exports = router;
