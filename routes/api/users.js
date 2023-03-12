const express = require('express');
const {createUser, loginUser, auth, authUser, logOut, current} = require('../../controllers/users/users')

const router = express.Router()

router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/list', auth, authUser);
router.post('/logout', auth, logOut)
router.post('/current', auth, current)



module.exports = router

