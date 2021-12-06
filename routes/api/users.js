const express = require('express');

const { ctrlWrapper, validation } = require('../../middlewares');
const { joiSignupSchema, joiLoginSchema } = require('../../models/user');

const { users: ctrl } = require('../../controllers');

const router = express.Router();

router.post('/signup', validation(joiSignupSchema), ctrlWrapper(ctrl.signup));
router.get('/login');
router.get('/logout');
router.get('/current');

module.exports = router;
