const express = require("express");

const router = express.Router();

const registerRoutes = require("./users/register");
const loginRoutes = require("./users/login");
const verifyRoutes = require("./users/verify");
const logoutRoutes = require("./users/logout");
const currentRoutes = require("./users/current");
const avatarRoutes = require("./users/avatar");
const contactRoutes = require("./api/contacts");
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");

router.use("/users", registerRoutes);
router.use("/users", loginRoutes);

router.use("/users", verifyRoutes);

router.use("/users", auth, logoutRoutes);
router.use("/users", auth, currentRoutes);
router.use("/users", auth, upload.single("avatar"), avatarRoutes);
router.use("/contacts", auth, contactRoutes);

module.exports = router;
