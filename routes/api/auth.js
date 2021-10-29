const express = require('express');
// const { controllerWrapper, validation } = require('../../middlewares');
const controllerWrapper = require('../../middlewares/controllerWrapper');
const validation = require('../../middlewares/validation');
const authenticate = require('../../middlewares/authenticate')
const { joiSchema } = require('../../model/user');
const { auth: ctrl } = require('../../controllers');

const router = express.Router();
// router.patch('/', controllerWrapper(ctrl.subscription));
// '/api/users/signup'
router.post('/signup', validation(joiSchema), controllerWrapper(ctrl.signup));
// '/api/users/login'
router.post('/login', validation(joiSchema), controllerWrapper(ctrl.login));
// '/api/users/loguot'
router.get('/logout', authenticate, controllerWrapper(ctrl.logout));
// router.post('/loguot', authenticate, controllerWrapper(ctrl.logout));

// '/api/users/current'
// router.get('/current', authenticate, controllerWrapper(ctrl.current));
router.get('/current', authenticate, controllerWrapper(ctrl.current));

router.get('/werify/:verificationToken', controllerWrapper(ctrl.verify));
module.exports = router;
