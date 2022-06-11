const express = require('express');
const { auth: ctrl } = require('../../controllers');
const { auth, validation } = require('../../middlewares');
const { joiSchema } = require('../../models/user');

const router = express.Router();

router.post('/signup', validation(joiSchema), ctrl.signup);

router.post('/login', validation(joiSchema), ctrl.login);

router.get('/logout', auth, ctrl.logout);

module.exports = router;
