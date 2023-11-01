const express = require('express');
const router = express.Router();
const controller = require('../../controllers/users');
const wrapper = require('../../helpers/controllerWrapper')
const auth = require('../../middlewares/authorizationMiddleware')


router.post('/registration', wrapper(controller.registration))
router.post('/login', wrapper(controller.login));
router.post('/logout',wrapper(auth) , wrapper(controller.logout));
router.get('/current',wrapper(auth) , wrapper(controller.current));

module.exports = router;