const express = require('express');

const { validation, ctrlWrapper, auth, upload } = require('../../middlewares');
const { auth: ctrl } = require('../../controllers');
const { joiRegisterSchema, joiLoginSchema } = require('../../models/user');

const router = express.Router();

router.post('/register', validation(joiRegisterSchema), ctrlWrapper(ctrl.register));

router.post('/login', validation(joiLoginSchema), ctrlWrapper(ctrl.login));

router.post('/logout', auth, ctrlWrapper(ctrl.logout));

router.get('/current', auth, ctrlWrapper(ctrl.getCurrent));

router.patch('/avatars', auth, upload.single('avatar'), ctrlWrapper(ctrl.updateAvatar));

module.exports = router;
