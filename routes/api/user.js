const express = require('express');

const {auth, ctrlWrapper} = require("../../middlewares");
const {auth: ctrl} = require('../../controllers/auth');

const router = express.Router();


router.post('/register', ctrlWrapper(ctrl.register));
router.post('/login', ctrlWrapper(ctrl.login));
router.get("/logout", auth, ctrlWrapper(ctrl.logout));

module.exports = router;