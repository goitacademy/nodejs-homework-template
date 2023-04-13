const express = require('express');

const { auth, upload, control } = require('../../middlewares/');

const { users: ctrl } = require('../../controllers');

const router = express.Router();

router.get('/current', control(auth), control(ctrl.getCurrent));
router.patch('/avatars', auth, upload.single('avatar'), control(ctrl.updateAvatar));
module.exports = router;
