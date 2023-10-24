const express = require('express');

const validateBody = require('../../helpers/validateBody');

const {logRegSchema} = require('../../models/user')

const ctrl = require('../../controllers/auth')

const router = express.Router();

router.post('/register', validateBody(logRegSchema), ctrl.register);

router.post('/login', validateBody(logRegSchema), ctrl.login);

module.exports = router;