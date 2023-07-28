const express = require('express');

const ctrll = require('../../controllers/auth');

const { validateBody } = require('../../middlewares');

const { schemaRegister } = require('../../schema');

const router = express.Router();

router.post('/register', validateBody(schemaRegister), ctrll.register);

module.exports = router;
