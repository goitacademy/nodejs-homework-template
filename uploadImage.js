import multer from 'multer';
import path from 'path';
import { AvatarProcessor } from './controllers/users/AvatarProcessor.js';

const avatarUploadDir = path.join(process.cwd(), 'public', 'avatars');
const tmpDir = path.join(process.cwd(), 'tmp');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, avatarUploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploadAvatar = multer({ storage });

const avatarProcessor = new AvatarProcessor(avatarUploadDir, path.join(process.cwd(), 'public'), tmpDir);

export { uploadAvatar, avatarProcessor };