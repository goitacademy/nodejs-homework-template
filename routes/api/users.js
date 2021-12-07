const express = require('express');

const { ctrlWrapper, validation, userCurrent } = require('../../middlewares');
const { joiSignupSchema, joiLoginSchema, joiSubscriptionSchema } = require('../../models/user');

const { users: ctrl } = require('../../controllers');

const router = express.Router();

router.post('/signup', validation(joiSignupSchema), ctrlWrapper(ctrl.signup));
router.post('/login', validation(joiLoginSchema), ctrlWrapper(ctrl.login));
router.get('/logout', userCurrent, ctrlWrapper(ctrl.logout));
router.get('/current', userCurrent, ctrlWrapper(ctrl.getCurrent));
router.patch('/:userId', validation(joiSubscriptionSchema), ctrlWrapper(ctrl.updateSubscription));

module.exports = router;
