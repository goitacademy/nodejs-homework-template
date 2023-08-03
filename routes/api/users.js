const express = require('express');

const {
    authenticate,
    validateData } = require('../../middlewares')

const {schemas} = require('../../models/user');

const {registerNewUser,
    logInUser,
    logOutUser,
    currentUser,
    } = require('../../controllers/users')
    
const router = express.Router();

/**
 * REGISTRATION NEW USER
 */
router.post('/register', validateData(schemas.registerSchema), registerNewUser);

/**
 * LOG IN USER
 */
router.post('/login', validateData(schemas.loginSchema), logInUser);

/**
 * LOG OUT USER
 */
router.post('/logout', authenticate, logOutUser);

/**
 * GET DATA ABOUT CURRENT USER
 */
router.get('/current', authenticate, currentUser);


module.exports = router;