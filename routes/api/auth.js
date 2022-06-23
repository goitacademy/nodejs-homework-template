const express = require('express');
const { auth: ctrl } = require('../../controllers')

const { ctrlWrapper } = require('../../helpers')
const {auth,validation} = require('../../middlewares')
const {schemas} = require('../../models/user')

const router = express.Router();

router.post('/register', validation(schemas.registerUser), ctrlWrapper(ctrl.register))

router.post('/login', validation(schemas.loginUser), ctrlWrapper(ctrl.login))

router.get('/current',auth, ctrlWrapper(ctrl.getCurrent))

router.get('/logout',auth, ctrlWrapper(ctrl.logout))

module.exports = router;