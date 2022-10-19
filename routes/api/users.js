const express = require("express");
const {users:ctrl}   = require("../../controllers");
const {auth,  ctrlWrapper } = require("../../middlewares");
const router = express.Router();


router.get("/current", auth,  ctrlWrapper(ctrl.getCurrent))

module.exports = router