const express = require('express');

const {validateBody} = require('../../middlewars');
const {ctrlWrapper} = require('../../helpers');
const {schemas} = require('../../models/user');
const ctrl = require('../../controllers/auth');
const router = express.Router();

router.post('/register', validateBody(schemas.registerSchema), ctrlWrapper(ctrl.register));

router.post('/login', validateBody(schemas.loginSchema), ctrlWrapper(ctrl.login));

module.exports = router;