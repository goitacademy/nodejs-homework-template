const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.post('/verify', userController.resendVerifyToken);
router.get('/verify/:verificationToken', userController.verifyEmail);
router.post('/resend-verification-email', userController.resendVerificationEmail);


module.exports = router;