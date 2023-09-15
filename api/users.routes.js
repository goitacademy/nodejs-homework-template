const express = require('express');
const {signUp, logIn, logOut, current, updateAvatar} = require('../controller/users')
const {auth}= require('../middleweres/jwtStrategy');
const { fileUpload } = require('../middleweres/fileUpload');

const router = express.Router();

router.post('/signup', signUp)
router.post('/login', logIn);
router.get('/logout', auth, logOut)
router.get('/current', auth, current)
router.patch('/avatars', auth, fileUpload.single('avatar'), updateAvatar)


module.exports = router