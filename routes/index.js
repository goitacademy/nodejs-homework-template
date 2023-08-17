const express = require("express");

const router = express.Router();

const contqactRoutes = require("./contacts");

router.use("/contacts", contqactRoutes);

module.exports = router;