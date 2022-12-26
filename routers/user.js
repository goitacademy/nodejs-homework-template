import express from 'express';
import multer from 'multer';

import UserController from '../controllers/user.js';
import { userMiddleware } from '../middlewares/user.js';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'tmp/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const router = express.Router();
const upload = multer({ storage: storage });


router.post('/signup', UserController.signup);
router.post('/login', UserController.login);
router.use(userMiddleware);
router.get('/logout', UserController.logout);
router.patch('/avatars', upload.single('avatar'), UserController.updateUserAvatar);


export default router;
