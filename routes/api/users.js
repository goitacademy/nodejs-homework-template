const express = require('express');

const { validation, ctrlWrapper, auth } = require('../../middleware');
const { joiSignInSchema, joiSignUpSchema, joiSubscriptionSchema } = require('../../models');
const { users: ctrl } = require('../../controllers');

const usersRouter = express.Router();

usersRouter.post('/signup', validation(joiSignUpSchema), ctrlWrapper(ctrl.signUp));
usersRouter.post('/login', validation(joiSignInSchema), ctrlWrapper(ctrl.login));
usersRouter.get('/logout', auth, ctrlWrapper(ctrl.logout));
usersRouter.get('/current', auth, ctrlWrapper(ctrl.current));
usersRouter.post('/:userId/subscription',
    auth, validation(joiSubscriptionSchema), ctrlWrapper(ctrl.updateSubscription));

module.exports = usersRouter;