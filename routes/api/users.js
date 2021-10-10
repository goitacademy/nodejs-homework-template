const express = require('express');
const { userJoiSchema } = require('../../models/user');
const { controllerWrapper, validation } = require('../../middlewares');
const { users: ctrl } = require('../../controllers');

const router = express.Router();

router.post('/signup', validation(userJoiSchema), controllerWrapper(ctrl.signup));
router.post('/login', validation(userJoiSchema), controllerWrapper(ctrl.login));
router.get('/logout', controllerWrapper(ctrl.logout));

module.exports = router;
