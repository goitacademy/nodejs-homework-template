const express = require('express');
const router = new express.Router();
const { userPostValidation, userPatchValidation } = require('../../middlewares/userValidation');
const { authMiddleware } = require('../../middlewares/authMiddleware');
const { asyncWrapper } = require('../../helpers/apiHelpers');
const {
    ctrlSignup,
    ctrlLogin,
    ctrlLogout,
    ctrlCurrent,
    ctrlChangeSubscription,
    ctrlChangeAvatar } = require('../../controllers/authController');
    
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve('./tmp'));
    },
    filename: function (req, file, cb) { // image.png
        const [, extension] = file.originalname.split('.');
        cb(null, `${uuidv4()}.${extension}`);
  }
});
const avatarMiddleware = multer({ storage });

router.post('/users/signup', userPostValidation, asyncWrapper(ctrlSignup));
router.post('/users/login', userPostValidation, asyncWrapper(ctrlLogin));
router.get('/users/logout', authMiddleware, asyncWrapper(ctrlLogout));
router.get('/users/current', authMiddleware, asyncWrapper(ctrlCurrent));
router.patch('/users', userPatchValidation, authMiddleware, asyncWrapper(ctrlChangeSubscription));
router.patch('/users/avatars',
    authMiddleware,
    avatarMiddleware.single('avatar'),
    asyncWrapper(ctrlChangeAvatar)
);

module.exports = router;