const express = require("express");

const router = express.Router();

const authRoutes = require("./users");
const bookRoutes = require("./contacts");

router.use("/users", authRoutes);
router.use("/contacts", bookRoutes);

module.exports = router;