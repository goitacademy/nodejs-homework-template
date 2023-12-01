const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");

const authRoutes = require("./auth");
const contactRoutes = require("./contacts");
const userRoutes = require("./users");
const avatarRoutes = require("./avatars");

router.use("/auth", authRoutes);
router.use("/contacts", auth, contactRoutes);
router.use("/users", auth, userRoutes);
router.use("/avatar", auth, avatarRoutes);
module.exports = router;
