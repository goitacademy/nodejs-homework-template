const express = require('express');

const {
    authenticate,
    validateData } = require('../../middlewares')

const {schemas} = require('../../models/user');

const {registerNewUser,
    logInUser,
    logOutUser,
    currentUser,
    } = require('../../controllers/users')

const uploadUserAvatar = require('../../services/uploadImageServices')  

const path = require('path');
const fs = require('fs/promises');
const avatarsDir = path.join(process.cwd(), "public", "avatars");
    
const router = express.Router();

/**
 * REGISTRATION NEW USER
 */
router.post('/register', validateData(schemas.registerSchema), registerNewUser);

/**
 * LOG IN USER
 */
router.post('/login', validateData(schemas.loginSchema), logInUser);

/**
 * LOG OUT USER
 */
router.post('/logout', authenticate, logOutUser);

/**
 * GET DATA ABOUT CURRENT USER
 */
router.get('/current', authenticate, currentUser);

/**
 * UPDATE USER AVATAR
 */
router.patch('/avatars', authenticate, uploadUserAvatar.single("avatar"), async(req, res) => {
    const {avatarURL, _id} = req.user;    

    const {path: tempDirUpload} = req.file;

    const finalUpload = path.join(avatarsDir, `${_id}.jpg`);

    await fs.rename(tempDirUpload, finalUpload);
    // await fs.rename(`../tmp/${_id}.jpg`, `../public/avatars/${_id}.jpg`)
    res.json({avatarURL});
    
});


module.exports = router;