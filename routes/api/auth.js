const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/auth");
const { authenticate } = require("../../middlewars");
const controllerWrapper = require("../../helpers/controllerWrapper");

router.post("/register", controllerWrapper(ctrl.register));

router.post("/login", controllerWrapper(ctrl.login));

router.post("/logout", authenticate, controllerWrapper(ctrl.logout));

router.get("/current", authenticate, controllerWrapper(ctrl.getCurrent));

module.exports = router;
