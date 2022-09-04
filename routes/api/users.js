const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/usersAuth");
const { ctrlWrapper } = require("../../utils");
const { auth } = require("../../middlewares");

router.post("users/signup", ctrlWrapper(ctrl.register));

router.post("users/login", ctrlWrapper(ctrl.login));

router.get("users/logout", auth, ctrlWrapper(ctrl.logout));

router.get("users/current", auth, ctrlWrapper(ctrl.listCurrent));

module.exports = router;
