const { Router } = require('express')
const router = Router()

const { users: ctrl } = require('../controllers/')

router.post('/signup', /* validate(registrationValidator), */ ctrl.signup)
// router.post('/login', validate(registrationValidator), ctrl.login);
// router.get('/logout', authenticate, ctrl.logout);
// router.get('/current', authenticate, ctrl.getCurrentUser);
// router.patch('/', validate(updateSubscriptionValidator), authenticate, ctrl.updateSubscription);

module.exports = router
