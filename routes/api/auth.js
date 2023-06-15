const express = require('express');
const { validate, validateAuth } = require('../../middlewares/validator');
const schemas = require('../../shema/shema');

const currentUser = require('../../controllers/users/currentUser');
const authenticate = require('../../middlewares/authenticate');
const logout = require('../../controllers/users/logout');
const login = require('../../controllers/users/login');
const register = require('../../controllers/users/register');

const router = express.Router();

router.post('/register', validate(schemas.registerSchema), register);
router.post('/login', validateAuth(schemas.loginSchema), login);

router.post('/logout', authenticate, logout);
router.get('/current', authenticate, currentUser);

module.exports = router;
