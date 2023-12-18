const express = require('express');

const authentificate  = require('../../middlewares');

const ctrl = require("../../controllers/auth");

const router = express.Router() ;

// singUp
router.post("/register", ctrl.register);

// singIn
router.post("/login", ctrl.login);

// logOut
router.post("/logout", authentificate, ctrl.logout);

// get current user
router.get("/current", authentificate, ctrl.getCurrent);

// get current user
router.patch("/subscription", authentificate, ctrl.updateSubscriptionUser);

module.exports = router;