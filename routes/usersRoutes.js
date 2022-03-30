const express = require('express');
const router = express.Router();
const {validateSignup, validateLogin} = require('../middlewares/validation')
const {currentUser,loginUser,logoutUser,signupUser, uploadAvatar,verifyUser, repeatVerifyUser} = require('../controllers');
const guard = require('../middlewares/guard');
const upload = require('../middlewares/upload');

router.post('/signup', validateSignup,signupUser);

router.post('/login', validateLogin, loginUser);

router.get('/logout', guard,logoutUser);

router.get('/current', guard,currentUser);

router.patch('/avatars', guard, upload.single('avatar'), uploadAvatar);

router.get('/verify/:token', verifyUser);

router.post('/verify/', repeatVerifyUser);

module.exports= router;