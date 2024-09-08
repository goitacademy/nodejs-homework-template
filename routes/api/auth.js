const express = require('express');
const authMiddleware = require ('../../middleware/jwt.js');
const router = express.Router();
const {register, login, logout, current, updateAvatar, verification, resendEmail}  =require('../../controllers/users.js');
const  {upload}  = require("../../middleware/upload.js");

router.post('/register', register);
router.post('/login', login);
router.get('/logout', authMiddleware, logout);
router.get('/current', authMiddleware, current);
router.patch('/avatars', authMiddleware, upload.single('picture'), updateAvatar);
router.get('/verify/:verificationToken', verification);
router.post('/verify/', resendEmail);

module.exports = router