const express = require("express");

const router = express.Router();


const authRoutes = require("./users");
const contactRoutes = require("./contacts");

const AuthMiddleware = require("../../middleware/auth");

router.use("/users", authRoutes);

router.use("/contacts", AuthMiddleware, contactRoutes);


module.exports = router;