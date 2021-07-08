const express = require('express');
const router = express.Router();
const guard = require('../../helpers/guard');
const userControllers = require('../../controllers/userControllers');
const upload = require('../../helpers/upload');

router.post('/registration', userControllers.reg);
router.post('/login', userControllers.login);
router.post('/logout', guard, userControllers.logout);
router.get('/current', guard, userControllers.getCurrentUser);
router.patch(
  '/avatars',
  guard,
  upload.single('avatar'),
  userControllers.avatars,
);
router.get('/verify/:verifyToken', userControllers.verify);
router.post('/verify', userControllers.getVerifyToken);
module.exports = router;
