const express = require('express')


const ctrl = require('../../controllers/users')

const  ctrlWrapper = require('../../middleware/ctrlWrapper')

const { user, upload } = require('../../middleware')

const router = express.Router()


router.post('/signup', ctrlWrapper(ctrl.register))

router.post('/login', ctrlWrapper(ctrl.login))

router.patch('/subscription', user, ctrlWrapper(ctrl.changeSubscription))

router.patch('/avatars', user, upload.single('avatar'), ctrlWrapper(ctrl.setAvatar))

router.get('/current', user, ctrlWrapper(ctrl.getCurrent))

router.get('/logout', user, ctrlWrapper(ctrl.logout))

module.exports = router