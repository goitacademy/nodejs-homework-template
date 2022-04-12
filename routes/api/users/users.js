const express = require('express');
const router = express.Router();
const tokenCheck = require('../../../helpers/token-check');
const { validationNewUser, validationLoginUser, validationSubscription } = require('./validation');
const Controllers = require('../../../controllers/users-controllers');

router.post('/signup', validationNewUser, Controllers.signup);
router.post('/login', validationLoginUser, Controllers.login);
router.post('/logout', tokenCheck, Controllers.logout);
router.get('/current', tokenCheck, Controllers.current);
router.patch('/', tokenCheck, validationSubscription, Controllers.updateSubscription);

module.exports = router;