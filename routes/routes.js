const express = require("express");
const contactRouter = require("./contacts");

const router = express.Router();

router.use("/api/contacts", contactRouter);

module.exports = router;
