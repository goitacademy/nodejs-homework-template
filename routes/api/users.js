const express = require('express');

const {auth, upload, ctrlWrapper} = require('../../middlewares');
const {users: ctrl} = require('../../controllers');

const router = express.Router();

router.get('/current', ctrlWrapper(auth), ctrlWrapper(ctrl.getCurrent));
router.patch('/avatars', auth, upload.single('avatar'), ctrlWrapper(ctrl.updateAvatar));

module.exports = router;