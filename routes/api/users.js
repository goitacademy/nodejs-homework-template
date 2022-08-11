const express = require('express');
const ctrl = require("../../controllers/users");
const {ctrlWrapper} = require("../../helpers");
const {users} = require("../../middlewares");
const router = express.Router();

router.post("/signup", ctrlWrapper(ctrl.signup));
router.post("/login", ctrlWrapper(ctrl.login));
router.get("/current", users, ctrlWrapper(ctrl.getCurrent));
router.get("/logout", users, ctrlWrapper(ctrl.logout));

module.exports = router;

