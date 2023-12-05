import multer from 'multer';
import jimp from 'jimp';
import path from 'path';
import { Router } from 'express';
import User from '../../models/User.js';

const avatarRouter = Router();


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


avatarRouter.patch('/avatars', upload.single('avatar'), async (req, res) => {
  try {
    const authorized = checkAuthorization(req.headers.authorization);
    if (!authorized) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const image = await jimp.read(req.file.buffer);
    await image.cover(250, 250).write(path.join(__dirname, '..', 'tmp', 'avatar1.jpg'));

    const uniqueFileName = generateUniqueFileName(); 
    const avatarPath = path.join(__dirname, '..', 'public', 'avatars', `${uniqueFileName}.jpg`);
    await image.write(avatarPath);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { avatarURL: `/avatars/${uniqueFileName}.jpg` },
      { new: true }
    );

    res.status(200).json({ avatarURL: updatedUser.avatarURL });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default avatarRouter;
