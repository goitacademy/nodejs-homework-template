const express = require("express");

const router = express.Router();


const authRoutes = require("./users");
const contactRoutes = require("./contacts");
const authMiddleware = require("../../middleware/auth");

router.use("/users", authRoutes);

router.use("/contacts", authMiddleware, contactRoutes);

module.exports = router;