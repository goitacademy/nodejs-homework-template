const express = require('express');

const {
    authenticate,
    validateData } = require('../../middlewares')

const {schemas} = require('../../models/user');

const {register, login, logout, current} = require('../../services/userServices')

const router = express.Router();

/**
 * REGISTRATION NEW USER
 */
router.post('/register', validateData(schemas.registerSchema), register);

/**
 * LOG IN USER
 */
router.post('/login', validateData(schemas.loginSchema), login);

/**
 * LOG OUT USER
 */
router.post('/logout', authenticate, logout);

/**
 * GET DATA ABOUT CURRENT USER
 */
router.get('/current', authenticate, current);


module.exports = router;