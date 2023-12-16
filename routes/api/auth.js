const express = require('express');

const ctrl = require("../../controllers/auth");

const router = express.Router() ;

// singUp
router.post("/register", ctrl.register);

// singIn
router.post("/login", ctrl.login);

module.exports = router;