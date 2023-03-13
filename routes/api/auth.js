const { Router } = require('express');
const { controllerWrapper, validation, auth } = require('../../middlewares');

const {
  userAuthControllers: { registerUser, loginUser, logoutUser },
} = require('../../controllers');

const { loginJoiSchema, registerJoiSchema } = require('../../models');

const router = Router();

router.post('/signup', validation(registerJoiSchema), controllerWrapper(registerUser));

router.post('/signin', validation(loginJoiSchema), controllerWrapper(loginUser));

router.post('/logout', auth, controllerWrapper(logoutUser));

module.exports = router;