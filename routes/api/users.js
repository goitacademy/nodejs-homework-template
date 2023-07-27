const express = require('express');

const {auth, upload, ctrlWrapper } = require('../../middlewares/');
const {users: ctrl} = require('../../controllers');

const router = express.Router();

router.get('/current', auth, ctrlWrapper(ctrl.getCurrent))
router.patch("/", auth, ctrlWrapper(ctrl.updateSubscription));
router.patch("/avatars", auth, upload.single('avatar'), ctrlWrapper(ctrl.updateAvatar));

module.exports = router;