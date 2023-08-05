const express = require('express')
const router = express.Router()

const { userLogin, userSingUp, logOut, currentUser } = require('../../controllers/userControler')
const { protect } = require('../../middlewares/userMiddlewares')

router.post('/register', userSingUp)
router.post('/login', userLogin)

router.use(protect)

router.post('/logout', logOut)
router.post('/current', currentUser)


module.exports = router