const express = require('express');
const router = express.Router();
const { validation, ctrlWrapper } = require('../../middlewares');
const { users: ctrl } = require('../../controllers');
const { schemas } = require('../../models/user');

router.post('/register', validation(schemas.registerSchema), ctrlWrapper(ctrl.register));

router.post('/login', validation(schemas.loginSchema), ctrlWrapper(ctrl.login));
module.exports = router;
