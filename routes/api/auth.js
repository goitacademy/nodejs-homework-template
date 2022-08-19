const express = require('express');

const { basedir } = global;

const ctrl = require(`${basedir}/controllers/auth`);

const { ctrlWrapper } = require(`${basedir}/helpers`);

const { auth } = require(`${basedir}/middlewares`);

const router = express.Router();

// sign up
router.post('/register', ctrlWrapper(ctrl.register));

// sign in
router.post('/login', ctrlWrapper(ctrl.login));

// current
router.get('/current', auth, ctrlWrapper(ctrl.getCurrent));

// log out
router.get('/logout', auth, ctrlWrapper(ctrl.logout));

// update subscription
router.patch("/current", auth, ctrlWrapper(ctrl.updateUserSubscription));

module.exports = router;