const express = require('express')
const router = express.Router()

const { userLogin, userSingUp, logOut, currentUser, addAvatar, emailVerification, sendEmailForVerification} = require('../../controllers/userControler')
const { protect,  uploutPhotoMiddlewares } = require('../../middlewares/userMiddlewares')

router.post('/register', userSingUp)
router.post('/login', userLogin)
router.post('/verify', sendEmailForVerification)
router.get('/verify/:verificationToken', emailVerification)

router.use(protect)

router.post('/logout', logOut)
router.post('/current', currentUser)
router.patch('/avatars', uploutPhotoMiddlewares, addAvatar)


module.exports = router