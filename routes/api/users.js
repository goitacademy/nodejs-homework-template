const express = require("express");
const router = express.Router();
const wrapperCtrl = require("../../middlewares/wrapperCtrl");
const ctrl = require("../../controllers/users");

router.post("/signup", wrapperCtrl(ctrl.signup));
router.post("/signin", wrapperCtrl(ctrl.signin));
module.exports = router;
