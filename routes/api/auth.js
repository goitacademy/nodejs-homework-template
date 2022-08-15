const express = require('express');

const { basedir } = global;

const ctrl = require(`${basedir}/controllers/auth`);

const { ctrlWrapper } = require(`${basedir}/helpers`);

const { auth, upload } = require(`${basedir}/middlewares`);

const router = express.Router();

router.post('/signup', ctrlWrapper(ctrl.signup)); // роут для реєстрації користувача

router.get('/verify/:verificationToken', ctrlWrapper(ctrl.verifyEmail)); // верифікація користувача

router.post('/verify', ctrlWrapper(ctrl.resendEmail)); // запит повторної верифікації користувача

router.post('/login', ctrlWrapper(ctrl.login)); // роут для входу користувача

router.get('/logout', auth, ctrlWrapper(ctrl.logout)); // роут для виходу користувача

router.get('/current', auth, ctrlWrapper(ctrl.getCurrent)); // роут для поточного користувача

router.patch('/subscription', auth, ctrlWrapper(ctrl.updateSubscription)); // роут для оновлення передплати користувача

router.patch('/avatars', auth, upload.single('avatar'), ctrlWrapper(ctrl.updateAvatar)); // роут для оновлення аватарки користувача

module.exports = router;