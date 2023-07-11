const express = require('express');
const validateBody = require('../../middleWares/validation');
const { schemas } = require('../../models/userModel');
const { register } = require('../../controllers/user');
const { login } = require('../../controllers/user');
const authorization = require('../../middleWares/authorization');
const { getCurrent } = require('../../controllers/user');
const { logout } = require('../../controllers/user');
const  upload  = require('../../middleWares/upload');
const updateAvatar = require('../../controllers/user/updateAvatar');

const router = express.Router()

router.post('/register',validateBody(schemas.registerSchema), register);
router.post('/login',validateBody(schemas.login) ,login );
router.get('/current', authorization, getCurrent);
router.post('/logout', authorization, logout);
router.patch('/avatars', authorization,upload.single('avatar'), updateAvatar)






module.exports = router