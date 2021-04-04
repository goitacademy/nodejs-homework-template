const express = require('express');
const router = express.Router();
const userControllers = require('../../controllers/users');
const {validateRegLoginUser} = require('../../validation/users')
const guard = require('../../helpers/guard')


router.post('/registration', validateRegLoginUser, userControllers.registration)
router.post('/login', validateRegLoginUser, userControllers.login)
router.post('/logout', guard, userControllers.logout)

module.exports = router
