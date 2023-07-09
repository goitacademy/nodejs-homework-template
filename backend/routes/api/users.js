const express = require('express');
const validateBody = require('../../middleWares/validation');
const { schemas } = require('../../models/userModel');
const { register } = require('../../controllers/user');
const { login } = require('../../controllers/user');
const authorization = require('../../middleWares/Authorization');
const { getCurrent } = require('../../controllers/user');
const { logout } = require('../../controllers/user');
const { upload } = require('../../middleWares/upload');
const avatar = require('../../controllers/user/avatar');

const router = express.Router()

router.post('/register',validateBody(schemas.registerSchema), register  );
router.post('/login',validateBody(schemas.login) ,login );
router.get('/current', authorization, getCurrent);
router.post('/logout', authorization, logout);
router.post('/avatars', authorization, upload.single('avatar'), avatar)






module.exports = router