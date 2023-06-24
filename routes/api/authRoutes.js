const { Router } = require('express');

const {signup, login, logout} = require('../../controllers/authController')
const {checkSignupUserData, protect} = require('../../middlewares/authMiddlewares')

const router = Router();

router.post('/signup', checkSignupUserData, signup)
router.post('/login', login)
router.post('/logout', protect, logout)

module.exports = router;