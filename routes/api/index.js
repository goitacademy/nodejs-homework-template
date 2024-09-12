const express = require("express");

const authRoutes = require("./auth");
const contactRoutes = require("./contacts");

const router = express.Router();

router.use("/contacts", contactRoutes);
router.use("/auth", authRoutes);

module.exports = router;
