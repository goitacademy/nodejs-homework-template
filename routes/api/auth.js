const express = require('express');
const { validateBody, authCheck } = require('../../middlewares');
const { register, login, current, logout } = require('../../controllers/auth');
const { joiRegisterSchema, joiLoginSchema } = require('../../models/user');
const { ctrlWrapper } = require('../../helpers');


const router = express.Router();

router.post('/register', validateBody(joiRegisterSchema), register);

router.post('/login', validateBody(joiLoginSchema), login);

router.get('/logout', authCheck, logout)

router.get('/current', authCheck, current)

module.exports = router;