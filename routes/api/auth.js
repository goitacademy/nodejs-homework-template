const express = require('express');
const authControllerRegister = require('../../controllers/authController');
const authControllerLogin = require('../../controllers/authControllerLogin');
const authControllerLogout = require('../../controllers/authControllerLogout');
const CurrentConrtoller = require('../../controllers/currentController');
const { protectMiddleware } = require('../../middleware/authMiddleware');

const router = express.Router();


router.post('/register', protectMiddleware,authControllerRegister)

router.post('/login', protectMiddleware,authControllerLogin)

router.post('/logout',protectMiddleware, authControllerLogout )

router.get('/current',protectMiddleware, CurrentConrtoller )




module.exports = router
