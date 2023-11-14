const express = require("express");

const router = express.Router();

const contactsRoutes = require("./contacts");
const authRoutes = require("./auth");

router.use("/auth", authRoutes);
router.use("/contacts", contactsRoutes);

module.exports = router;
