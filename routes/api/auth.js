const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/auth");
// const { schemas } = require("../../models/user");

router.post("/register", ctrl.register);

module.exports = router;
