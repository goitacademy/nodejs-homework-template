const express = require('express');
const router = express.Router();
const { usersController } = require('../../controller');
const auth = require('../../middlewares/auth');

router.post('/signup', usersController.userSignup);

router.post('/login', usersController.userLogin);

router.get('/logout', auth, usersController.userLogout);

router.get('/current', auth, usersController.userCurrent);

router.patch('/', auth, usersController.userUpdate)

module.exports = router;