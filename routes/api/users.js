const express = require("express");
const ctrl = require("../../controllers/users");
const router = express.Router();
const { ctrlWrapper } = require("../../helpers");
const { auth } = require("../../middlewares");

router.post("/signup", ctrlWrapper(ctrl.register));
router.post("/login", ctrlWrapper(ctrl.login));
router.get("/logout", auth, ctrlWrapper(ctrl.logout));
router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

module.exports = router;
