const express = require("express");
const router = express.Router();

const { rollbackController } = require("../controllers/rollbackController");

router.get("/", rollbackController);

module.exports = router;
