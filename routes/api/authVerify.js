const express = require('express');
const router = express.Router();
const {authVerification} = require('../../controllers/auth/authVerification')


router.get('/:verificationToken', authVerification );

module.exports = router;