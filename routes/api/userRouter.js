const express = require('express')
const router = express.Router()

const { userLogin, userSingUp, logOut, currentUser, addAvatar} = require('../../controllers/userControler')
const { protect,  uploutPhotoMiddlewares } = require('../../middlewares/userMiddlewares')

router.post('/register', userSingUp)
router.post('/login', userLogin)

router.use(protect)

router.post('/logout', logOut)
router.post('/current', currentUser)
router.patch('/avatars', uploutPhotoMiddlewares, addAvatar)


module.exports = router