const express = require("express");
const router = express.Router();
const { auth } = require("../../middlewares");
const { ctrlWrapper } = require("../../helpers/index");
const ctrl = require("../../controllers/auth");

router.post("/register", auth, ctrlWrapper(ctrl.register));
router.post("/login", auth, ctrlWrapper(ctrl.login));
router.get("/current", auth, ctrlWrapper(ctrl.current));
router.get("/logout", auth, ctrlWrapper(ctrl.logout));

module.exports = router;
