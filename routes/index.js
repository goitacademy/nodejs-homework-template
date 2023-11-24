const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");

const authRoutes = require("./auth");

const contactRoutes = require("./contacts");

const userRoutes = require("./users");

router.use("/auth", authRoutes);
router.use("/contacts", auth, contactRoutes);
router.use("/users", auth, userRoutes);

module.exports = router;
