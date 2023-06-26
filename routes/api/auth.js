const express = require('express');

const {validateBody} = require('../../middlewares');

const {schemas} = require('../../models/user');

const router = express.Router();

router.post('/register', validateBody(schemas.registerSchema));


module.exports = router;