const express = require('express');
const router = express.Router();
const userController = require('../../controller/usersController');
const auth = require('../../middlewares/userAuth');
const { upload } = require('../../middlewares/avatarsUpload');

router.post('/signup', userController.register);

router.post('/login', userController.login);

router.get('/logout', auth, userController.logout);

router.get('/current', auth, userController.current);

router.patch('/', auth, userController.updateSubscription);

router.patch(
  '/avatars',
  auth,
  upload.single('avatar'),
  userController.updateAvatar
);

module.exports = router;
