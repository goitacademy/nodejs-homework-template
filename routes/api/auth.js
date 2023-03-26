const express = require('express');

const { auth } = require("../../middlewares");
const { auth: ctrl } = require('../../controllers');
const { ctrlWrapper } = require('../../helpers');

const router = express.Router();

// signup (always post)
router.post('/register', ctrlWrapper(ctrl.register));
// signin
router.post('/login', ctrlWrapper(ctrl.login));

router.get('/current', auth, ctrlWrapper(ctrl.getCurrent));

router.get('/logout', auth, ctrlWrapper(ctrl.logout));

module.exports = router;
