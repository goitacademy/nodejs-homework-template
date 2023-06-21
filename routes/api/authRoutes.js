const { Router } = require('express');

const {signup, login} = require('../../controllers/authController')
const {checkSignupUserData} = require('../../middlewares/authMiddlewares')

const router = Router();

router.post('/signup', checkSignupUserData, signup)
router.post('/login', login)

module.exports = router;