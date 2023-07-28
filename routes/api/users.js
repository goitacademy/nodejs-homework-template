const express = require('express');

const validateData = require('../../middlewares/validateData');

const authenticate = require('../../middlewares/authenticate');

const {schemas} = require('../../models/user');

const {register, login} = require('../../services/userServices')

const router = express.Router();

/**
 * REGISTRATION NEW USER
 */
router.post('/register', validateData(schemas.registerSchema), register);

/**
 * LOG IN USER
 */
router.post('/login', authenticate, validateData(schemas.loginSchema), login);

/**
 * LOG OUT USER
 */
router.post('/logout');

/**
 * GET DATA ABOUT CURRENT USER
 */
router.get('/current');


module.exports = router;