import path from 'node:path';
import multer from 'multer';
import { AVATARS_DIR, MAX_AVATAR_FILE_SIZE_IN_BYTES } from '../helpers/globalVariables.js';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, AVATARS_DIR);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const uniqueSuffix = Date.now() + '-' + Math.random(Math.random() * 1e9);
    cb(null, file.fieldname + '_' + uniqueSuffix + ext);
  },
});

const upload = multer({
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg' && ext !== '.gif') {
      return cb(
        new Error(
          'Wrong extension type! You can upload avatar only with extension: .png, .jpg, .jpeg or .gif.',
        ),
        false,
      );
    }
    cb(null, true);
  },
  storage,
  limits: { fileSize: MAX_AVATAR_FILE_SIZE_IN_BYTES },
});

export default upload;
