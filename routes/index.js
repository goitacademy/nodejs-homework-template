const express = require("express")

const router = express.Router();

const auth = require("../middleware/auth")

const authRoutes = require('./auth');

const contactRoutes = require("./contacts");

router.use("/auth", authRoutes);
router.use("/contacts", auth, contactRoutes);

module.exports = router;