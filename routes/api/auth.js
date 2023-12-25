// routes/auth.js

const express = require("express");
const { registerValid } = require("../../middlewares/authValidation");
const authCtrl = require("../../controllers/auth");

const router = express.Router();

router.post("/register", registerValid, authCtrl.register);

module.exports = router;
