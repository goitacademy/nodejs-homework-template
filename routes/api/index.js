const express = require("express");
const router = express.Router();

router.use("/users", require("./users"));
router.use("/contacts", require("./contacts"));

module.exports = router;
