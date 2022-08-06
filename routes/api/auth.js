const express = require('express')
const router = express.Router()
const {basedir} = global
const {auth, upload} = require(`${basedir}/middlewares`)
const {register, login, logout, currentUser, setAvatar} = require(`${basedir}/controllers/auth`)
const {validateUser} = require('./validation')
const ctrlWrapper = require(`${basedir}/helpers/ctrlWrapper`)

router.post('/register', validateUser, ctrlWrapper(register))

router.post('/login', validateUser, ctrlWrapper(login))

router.get('/logout', auth, ctrlWrapper(logout))

router.get('/current', auth, ctrlWrapper(currentUser))

router.patch('/avatars', auth, upload.single('avatar'), ctrlWrapper(setAvatar))

module.exports = router