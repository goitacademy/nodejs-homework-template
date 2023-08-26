const express = require("express");

const router = express.Router();

const registerRoutes = require("./users/register");
const loginRoutes = require("./users/login");

const logoutRoutes = require("./users/logout");
const currentRoutes = require("./users/current");
const contactRoutes = require("./api/contacts");
const auth = require("../middleware/auth");

router.use("/users", registerRoutes);
router.use("/users", loginRoutes);
router.use("/users", auth, logoutRoutes);
router.use("/users", auth, currentRoutes);

router.use("/contacts", auth, contactRoutes);

module.exports = router;
