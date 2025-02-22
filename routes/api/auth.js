const express = require('express');

const { auth: ctrl } = require('../../controllers');

const { auth, validation, ctrlWrapper } = require('../../middlewares');

const { joiAuthSchema } = require('../../models');

const router = express.Router();

router.post('/register', validation(joiAuthSchema), ctrlWrapper(ctrl.register));

router.post('/login', validation(joiAuthSchema), ctrlWrapper(ctrl.login));

router.get('/logout', auth, ctrlWrapper(ctrl.logout));

module.exports = router;