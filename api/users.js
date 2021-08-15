const { Router } = require('express');
const router = Router();

const { validate, authenticate, upload } = require('../middleware/');
const { registrationValidator, updateSubscriptionValidator } = require('../utils/validate/schemas');

const { users: ctrl } = require('../controllers/');

router.post('/signup', validate(registrationValidator), ctrl.signup);
router.post('/login', validate(registrationValidator), ctrl.login);
router.get('/logout', authenticate, ctrl.logout);
router.get('/current', authenticate, ctrl.getCurrentUser);
router.patch('/', validate(updateSubscriptionValidator), authenticate, ctrl.updateSubscription);
router.patch('/avatars', authenticate, upload, ctrl.updateAvatar);
router.get('/verify/:verifyCode', ctrl.verify);
router.post('/verify', ctrl.reVerify);

module.exports = router;