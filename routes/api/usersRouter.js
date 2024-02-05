import express from 'express';
import {
  signUp,
  login,
  logout,
  getCurrentUser,
  updateAvatar, 
} from '../../controllers/usersController.js';
import { authMiddleware } from '../../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', login);
router.post('/logout', authMiddleware, logout);
router.get('/current', authMiddleware, getCurrentUser);


router.patch('/avatars', authMiddleware, async (req, res, next) => {
  const { user } = req;
  const { file } = req;

  try {
    const uniqueFilename = generateUniqueFilename(); 
    const image = await jimp.read(file.buffer);
    await image.resize(250, 250).writeAsync(`./public/avatars/${uniqueFilename}`);

    const avatarURL = await updateAvatar(user._id, uniqueFilename);

    res.status(200).json({ avatarURL });
  } catch (error) {
    next(error);
  }
});

export default router;
