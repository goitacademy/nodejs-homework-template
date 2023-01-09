const express = require('express');

const router = express.Router();

const ctrl = require('../../controllers/auth');

const { validateBody } = require('../../middlewares');
const { schemas } = require('../../models/user');

// запрос на регистрацию(signup)
router.post('/register', validateBody(schemas.registerSchema), ctrl.register)
// запрос на логин(signin)
router.post('/login', validateBody(schemas.loginSchema), ctrl.login)



module.exports = router;