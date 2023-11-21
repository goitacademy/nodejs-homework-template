const express = require("express");

const router = express.Router();
const auth = require("../middleware/authMiddleware");

const contactsRoutes = require("./contacts");
const authRoutes = require("./auth");

router.use("/users", authRoutes);
router.use("/contacts", auth, contactsRoutes);

module.exports = router;
