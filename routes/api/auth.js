const express = require('express');
const router = express.Router();
const { validateBody } = require('../../decorators');
const { authenticate, upload } = require('../../midlewares');
const { authSchemas } = require('../../models');
const { 
    register, 
    login, 
    getCurrent, 
    logout, 
    updateUserSubscription, 
    updateAvatar } = require('../../controllers');

router.post('/register', validateBody(authSchemas.registerSchema), register);
router.post('/login', validateBody(authSchemas.registerSchema), login);
router.get('/current', authenticate, getCurrent);
router.post('/logout', authenticate, logout);
router.patch('/', authenticate, updateUserSubscription);
router.patch('/avatars', authenticate, upload.single('avatar'), updateAvatar);

module.exports = router;