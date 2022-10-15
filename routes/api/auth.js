const express = require('express');

const {validateBody, authenticate} = require('../../middlewars');
const {ctrlWrapper} = require('../../helpers');
const {schemas} = require('../../models/user');
const ctrl = require('../../controllers/auth');
const router = express.Router();

router.post('/register', validateBody(schemas.registerSchema), ctrlWrapper(ctrl.register));

router.post('/login', validateBody(schemas.loginSchema), ctrlWrapper(ctrl.login));

router.get('/current', authenticate, ctrlWrapper(ctrl.getCurrrent));

router.get('/logout', authenticate, ctrlWrapper(ctrl.logout));

module.exports = router;