const express = require('express');

const ctrl = require('../../controllers/auth');
const { ctrlWrapper } = require('../../helpers');
const { auth, upload } = require('../../middlewares');

const router = express.Router();

// signup (always post)
router.post('/register', ctrlWrapper(ctrl.register));
// signin
router.post('/login', ctrlWrapper(ctrl.login));

router.get('/current', auth, ctrlWrapper(ctrl.getCurrent));

router.get('/logout', auth, ctrlWrapper(ctrl.logout));

router.patch(
  '/avatars',
  auth,
  upload.single('avatar'),
  ctrlWrapper(ctrl.setAvatar)
);

module.exports = router;
