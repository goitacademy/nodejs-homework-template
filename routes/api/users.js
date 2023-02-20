const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/usersController");
const { ctrlWrapper } = require("../../utils");
const { auth } = require("../../middlewares");

router.post("/signup", ctrlWrapper(ctrl.register));

router.post("/login", ctrlWrapper(ctrl.login));

router.get("/logout", auth, ctrlWrapper(ctrl.logout));

router.get("/current", auth, ctrlWrapper(ctrl.listCurrent));

module.exports = router;
