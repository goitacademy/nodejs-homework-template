const express = require('express');
const router = express.Router();
const { schemas } = require('../../models/user');
const { validateBody } = require('../../middlewares');
const ctrl = require('../../controllers/auth');

router.post('/register', validateBody(schemas.registerSchema), ctrl.registerCtrl);

module.exports = router;
