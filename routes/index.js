const express = require("express")

const router = express.Router();

const authRoutes = require('./auth');

const contactRoutes = require("./contacts");

router.use("/auth", authRoutes);
router.use("/contacts", contactRoutes);

module.exports = router;