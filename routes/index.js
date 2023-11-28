const express = require("express");
const router = express.Router();

router.use("/users", require("./users"));
router.use("/api/v1", require("./api"));

module.exports = router;
