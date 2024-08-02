const express = require("express");
const router = express.Router();

const userRoutes = require("./users");
const contactRoutes = require("./contacts");

router.use("/users", userRoutes);
router.use("/contacts", contactRoutes);

module.exports = router;