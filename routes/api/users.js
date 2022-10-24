const express = require('express')


const ctrl = require('../../controllers/users')

const  ctrlWrapper = require('../../middleware/ctrlWrapper')

const { auth, upload } = require('../../middleware')

const router = express.Router()


router.post('/signup', ctrlWrapper(ctrl.register))

router.post('/login', ctrlWrapper(ctrl.login))

router.patch('/subscription', auth, ctrlWrapper(ctrl.changeSubscription))

router.patch('/avatars', auth, upload.single('avatar'), ctrlWrapper(ctrl.setAvatar))

router.get('/current', auth, ctrlWrapper(ctrl.getCurrent))

router.get('/logout', auth, ctrlWrapper(ctrl.logout))

module.exports = router