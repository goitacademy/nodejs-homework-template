const express = require('express');
const router = express.Router();

const { registerLimiter } = require('../../../helpers/limiter');

const guard = require('../../../helpers/guard');

const ctrls = require('../../../controllers/users.js');

const upload = require('../../../helpers/upload');

const {
  validateSignupUser,
  validateLoginUser,
  validateUpdateSubscription,
} = require('../users/validation-user');

router.patch('/', validateUpdateSubscription, guard, ctrls.updateSubscription);
router.post('/signup', validateSignupUser, registerLimiter, ctrls.signup);
router.post('/login', validateLoginUser, ctrls.login);
router.post('/logout', guard, ctrls.logout);
router.get('/current', guard, ctrls.current);
router.patch('/avatars', [guard, upload.single('avatar')], ctrls.avatars);

module.exports = router;
