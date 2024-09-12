const express = require('express');
const authControllerRegister = require('../../controllers/authController');
const authControllerLogin = require('../../controllers/authControllerLogin');
const authControllerLogout = require('../../controllers/authControllerLogout');
const CurrentConrtoller = require('../../controllers/currentController');
const currentUpdate = require('../../controllers/currentUpdate');
const verifyController = require('../../controllers/verifyController');
const verifyControllerResend = require('../../controllers/verifyControllerResend'); // Импортируйте здесь
const { protectMiddleware } = require('../../middleware/authMiddleware');
const ImageService = require('../../services/imageService');

const router = express.Router();

router.patch('/update-current', protectMiddleware, ImageService.upload('image'), currentUpdate);
router.post('/register', authControllerRegister);
router.get('/verify/:verificationToken', verifyController);
router.post('/verify', verifyControllerResend); 
router.post('/login', protectMiddleware, authControllerLogin);

router.post('/logout', protectMiddleware, authControllerLogout);

router.get('/current', protectMiddleware, CurrentConrtoller);

module.exports = router;
