const express = require('express')

const ctrl = require('../../controllers/auth')

const { schemas } = require("../../models/user");

const { validateBody } = require("../../middlewares/Validation")
const { authenticate } = require('../../middlewares/Authentication');
const { upload } = require("../../middlewares/Uploads");


const router = express.Router()


router.post('/signup', validateBody(schemas.registerSchema), ctrl.register)

router.post('/login', validateBody(schemas.loginSchema), ctrl.login)

router.get('/current', authenticate, ctrl.current)

router.get('/logout', authenticate, ctrl.logout)

router.patch('/avatars', authenticate, upload.single("avatar"), ctrl.updateAvatar)






module.exports = router