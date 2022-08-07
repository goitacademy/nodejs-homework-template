const express = require('express');

const { basedir } = global;

const ctrl = require(`${basedir}/controllers/auth`);

const { ctrlWrapper } = require(`${basedir}/helpers`);

const { auth, upload } = require(`${basedir}/middlewares`);

const router = express.Router();

router.post('/signup', ctrlWrapper(ctrl.signup));

router.post('/login', ctrlWrapper(ctrl.login));

router.get('/logout', auth, ctrlWrapper(ctrl.logout));

router.get('/current', auth, ctrlWrapper(ctrl.getCurrent));

router.patch('/subscription', auth, ctrlWrapper(ctrl.updateSubscription));

router.patch('/avatars', auth, upload.single('avatar'), ctrlWrapper(ctrl.setAvatar));

module.exports = router;