const express = require('express');

const { auth, ctrlWrapper } = require('../../middlewares');

const { users: ctrl } = require('../../controllers');

const router = express.Router();

router.patch('/', auth, ctrlWrapper(ctrl.updateSubscription));

router.get('/current', auth, ctrlWrapper(ctrl.getCurrent));

module.exports = router;