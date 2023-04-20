const { Router } = require('express');
const {authenticate, validateBody} = require('../middlewars');

const ctrl = require('../controllers/auth');
const { schemas } = require('../models/users');
const router = Router();

router
    .post('/register', validateBody(schemas.registerSchema), ctrl.register)
    .post('/login', validateBody(schemas.loginSchema), ctrl.login)
    .post('/logout', authenticate, ctrl.logout)
    .get('/current', authenticate, ctrl.getCurrent)
    .patch('/', authenticate, validateBody(schemas.subscriptionSchema), ctrl.updateSubscription);

module.exports = router;
