const express = require('express');

const validateData = require('../../middlewares/validateData');

const {schemas} = require('../../models/user');

const {register} = require('../../services/userServices')

const router = express.Router();

router.post('/register', validateData(schemas.registerSchema), register);

router.post('/login', validateData(schemas.loginSchema));

router.post('/logout');

router.get('/current');

module.exports = router;