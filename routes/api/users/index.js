const express = require('express');
const router = express.Router();
const validate = require('./validation');
const userController = require('../../../controllers/users');
const guard = require('../../../helpers/guard');

router.post('/auth/register', validate.createUser, userController.reg);
router.post('/auth/login', userController.login);
router.post('/auth/logout', guard, userController.logout);
router.get('/current', userController.getCurrentUser);

module.exports = router;
