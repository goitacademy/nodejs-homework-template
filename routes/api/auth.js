const express = require('express');

const ctrl = require('../../controllers/users/index')

const {validateBody} = require('../../middlewares')

const {schemas} = require('../../models/user');

const router = express.Router();

router.post('/users/register', validateBody(schemas.registerSchema), ctrl.register)

module.exports = router;