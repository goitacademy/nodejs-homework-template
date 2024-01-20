const express = require("express");

const router = express.Router();

const userRoutes = require("./users");
const contactRoutes = require("./contacts");

const authMiddleware = require("../middleware/auth");

router.use("/users", userRoutes);
router.use("/contacts", authMiddleware, contactRoutes);

module.exports = router;
