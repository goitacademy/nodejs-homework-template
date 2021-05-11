const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/users');
const guard = require('../../helper/guard');
const uploadAvatar = require('../../helper/upload-avatar');

router.post('/signup', ctrl.reg);
router.post('/login', ctrl.login);
router.post('/logout', guard, ctrl.logout);
router.get('/current', guard, ctrl.current);
router.patch(
  '/avatars',
  guard,
  uploadAvatar.single('avatar'),
  ctrl.updateAvatar,
);

module.exports = router;
