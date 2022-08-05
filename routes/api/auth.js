const express = require('express');

const ctrl = require('../../controllers/auth');
const { ctrlWrapper } = require('../../helpers');
const { auth } = require('../../middlewares');

const router = express.Router();

// signup (always post)
router.post('/register', ctrlWrapper(ctrl.register));
// signin
router.post('/login', ctrlWrapper(ctrl.login));

router.get('/current', auth, ctrlWrapper(ctrl.getCurrent));

router.get('/logout', auth, ctrlWrapper(ctrl.logout));
module.exports = router;
