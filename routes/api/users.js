const express = require('express')

const ctrl = require('../../controllers/auth');
const {authenticate} = require('../../middlewares');

const router = express.Router()

router.post('/signup', ctrl.register);
router.post('/login', ctrl.login);
router.get('/logout', authenticate, ctrl.logout);
router.get('/current', authenticate, ctrl.login);

module.exports = router;
