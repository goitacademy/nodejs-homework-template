const express = require('express');
const multer = require('multer')
const {createUser, loginUser, auth, authUser, logOut, current, avatars} = require('../../controllers/users')

const router = express.Router()
const upload = multer({ dest: 'tmp/' })


router.post('/register', createUser);

router.post('/login', loginUser);

router.get('/list', auth, authUser);

router.post('/logout', auth, logOut);

router.post('/current', auth, current);

router.patch('/avatars', upload.single('avatar'), avatars )

module.exports = router

