const express = require("express");

const router = express.Router();

const contactRoutes = require("./contacts");

router.use("/contacts", contactRoutes);

module.exports = router;
