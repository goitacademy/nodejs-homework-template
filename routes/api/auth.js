const express = require('express');

const { auth, validation } = require('../../middlewares');
const { joiRegisterSchema, joiLoginSchema } = require('../../models/user');
const { ctrlWrap } = require('../../helpers');
const { auth: ctrl } = require('../../controllers');

const router = express.Router();

router.get('/current', auth, ctrlWrap(ctrl.getCurrent))

router.post('/register', validation({ schema: joiRegisterSchema }), ctrlWrap(ctrl.register))

router.post('/login', validation({ schema: joiLoginSchema }), ctrlWrap(ctrl.login))

module.exports = router;