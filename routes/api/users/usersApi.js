const express = require('express');
const router = express.Router();

const validate = require('./userValidation');
const userController = require('../../../controllers/usersController');
const guard = require('../../../helper/quard');
const uploadAvatar = require('../../../helper/uploadAvatar');

router.post('/registration', validate.Registration, userController.reg);
router.post('/login', validate.Login, userController.login);
router.post('/logout', guard, userController.logout);
router.get('/current', guard, userController.current);
router.patch(
  '/avatars',
  guard,
  uploadAvatar.single('avatar'),
  userController.updateAvatar
);

module.exports = router;
