const express = require("express")

const router = express.Router();

const contactRoutes = require("./contacts");
console.log(contactRoutes);

router.use("/contacts", contactRoutes);

module.exports = router;