const express = require('express')

const { basedir } = global

const ctrl = require(`${basedir}/controllers/auth`)

const { controllersWrapper } = require(`${basedir}/helpers`)

const { auth } = require(`${basedir}/middlewares`)

const router = express.Router()

router.post('/register', controllersWrapper(ctrl.register))

router.post('/login', controllersWrapper(ctrl.login))

router.patch('/:userId/user', controllersWrapper(ctrl.updateUserSubscription))

router.get('/current', auth, controllersWrapper(ctrl.getCurrent))

router.get('/logout', auth, controllersWrapper(ctrl.logout))

module.exports = router