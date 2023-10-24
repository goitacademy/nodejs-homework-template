const express = require('express');

const validateBody = require('../../helpers/validateBody');

const logRegSсhema = require('../../models/user');

const ctrl = require('../../controllers/auth')

const router = express.Router();

// const ctrl = require('../../controllers/contacts')

router.post('/', validateBody(logRegSсhema), ctrl.register)

module.exports = router