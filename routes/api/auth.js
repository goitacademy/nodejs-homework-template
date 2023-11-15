const express = require('express');

const validateBody = require('../../helpers/validateBody');

const authenticate = require('../../helpers/authenticate');

const {logRegSchema} = require('../../models/user')

const ctrl = require('../../controllers/auth')

const router = express.Router();

router.post('/register', validateBody(logRegSchema), ctrl.register);

router.post('/login', validateBody(logRegSchema), ctrl.login);

router.post('/logout', validateBody(logRegSchema), ctrl.logOut)

router.get('/', authenticate, ctrl.getCurrent);

module.exports = router;