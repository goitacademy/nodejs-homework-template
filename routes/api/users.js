const express = require("express");

const router = express.Router();


const ctrl = require("../../controllers/users");

router.get("/register", ctrl.register);

router.get("/login");

module.exports = router;
