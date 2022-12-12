const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/auth");
const controllerWrapper = require("../../helpers/controllerWrapper");

router.post("/register", controllerWrapper(ctrl.register));

router.post("/login", controllerWrapper(ctrl.login));

router.post("/logout", controllerWrapper(ctrl.logout));

module.exports = router;
