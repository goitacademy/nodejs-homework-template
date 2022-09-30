const express = require('express');
const { usersController: ctrl } = require('../../controllers');
const { auth } = require('../../middlewares');

const { ctrlWrapper } = require('../../helpers');

const router = express.Router();

router.post('/register', ctrlWrapper(ctrl.registerUser));

router.post('/login', ctrlWrapper(ctrl.logInUser));

router.post('/logout', auth, ctrlWrapper(ctrl.logOutUser));

router.get('/current', auth, ctrlWrapper(ctrl.listCurrentUser));

router.put('/', auth, ctrlWrapper(ctrl.updateUserSubscription));

module.exports = router;
