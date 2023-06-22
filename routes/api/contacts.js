const express = require("express");
const router = express.Router();

const contactsController = require("../../controllers/contactController");

router.use("/", contactsController);

module.exports = router;
