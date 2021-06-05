const express = require('express');
const router = express.Router();
const { validateAuth, validateUpdateSub } = require('../../service/validation');
const userController = require('../../controllers/users');
const guard = require('../../service/guard');

router.post('/auth/register', validateAuth, userController.register);
router.post('/auth/login', validateAuth, userController.login);
router.post('/auth/logout', guard, userController.logout);
router.get('/current', guard, userController.currentUser);
router.patch('/', guard, validateUpdateSub, userController.updateSub);

module.exports = router;
