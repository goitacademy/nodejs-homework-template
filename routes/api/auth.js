const express = require('express');
const { auth: ctrl } = require('../../controllers');
const { validation } = require('../../middlewares');
const { joiSchema } = require('../../models/user');

const router = express.Router();

router.post('/signup', validation(joiSchema), ctrl.signup);

router.post('/login', validation(joiSchema), ctrl.login);

module.exports = router;
