const express = require('express');

const { ctrlWrapper, validation, authenticate } = require('../../middlewares');
const ctrl = require('../../controllers/auth');
const { auth } = require('../../model');
const { authSchema } = auth;

const router = express.Router();

router.post('/signup', validation(authSchema), ctrlWrapper(ctrl.register));

router.post('/login', validation(authSchema), ctrlWrapper(ctrl.login));

router.get('/logout', authenticate, ctrlWrapper(ctrl.logout));

router.get('/current', authenticate, ctrlWrapper(ctrl.current));

module.exports = router;
