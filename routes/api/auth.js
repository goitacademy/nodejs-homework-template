const express = require('express');
const router = express.Router();
const {registerUser, loginUser, logoutUser, confirm, resend} = require('../../controllers');
const {schemaRegister, schemaLogin} = require('../../models/user')    
const { validation } = require('../../middlewares/validation');
const { auth } = require('../../middlewares/auth');



router.post('/registration', validation(schemaRegister), registerUser );
router.post('/login', validation(schemaLogin), loginUser);
router.post('/logout', auth, logoutUser);
router.get('/verify/:verificationToken', confirm);
router.post('/verify', resend);

module.exports = router;


