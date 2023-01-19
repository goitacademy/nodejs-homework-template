const express = require('express');
const router = express.Router();
const { auth, validation, ctrlWrapper, upload } = require('../../middlewares');
const { users: ctrl } = require('../../controllers');
const { schemas } = require('../../models/user');

router.post('/register', validation(schemas.registerSchema), ctrlWrapper(ctrl.register));

router.get('/current', auth, ctrlWrapper(ctrl.getCurrent));

router.post('/login', validation(schemas.loginSchema), ctrlWrapper(ctrl.login));

router.get('/logout', auth, ctrlWrapper(ctrl.logout));

router.patch('/avatars', auth, upload.single('avatar'), ctrlWrapper(ctrl.updateAvatar));

module.exports = router;
