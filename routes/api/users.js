const express = require('express');

const {validateData} = require('../../middlewares/validateData');

const {schemas} = require('../../models/user');


const router = express.Router();

router.post('/register', validateData(schemas.registerSchema));

router.post('/login', validateData(schemas.loginSchema));

router.post('/logout');

router.get('/current');

module.exports = router;