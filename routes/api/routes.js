const express = require("express");
const contactRouter = require("./contacts");

const router = express.Router();

router.use("/contacts", contactRouter);

module.exports = router;
