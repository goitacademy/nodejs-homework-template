const express = require('express');
const authControllerRegister = require('../../controllers/authController');
const authControllerLogin = require('../../controllers/authControllerLogin');
const authControllerLogout = require('../../controllers/authControllerLogout');
const CurrentConrtoller = require('../../controllers/currentController');
const currentUpdate = require('../../controllers/currentUpdate');
const { protectMiddleware } = require('../../middleware/authMiddleware');
const imageService = require('../../services/imageService');

const router = express.Router();

router.post('/update-current', protectMiddleware, imageService.upload('image'), currentUpdate)
router.post('/register', authControllerRegister)

router.post('/login', protectMiddleware, authControllerLogin)

router.post('/logout', protectMiddleware, authControllerLogout)

router.get('/current', protectMiddleware, CurrentConrtoller)

module.exports = router;
