import multer from 'multer';
import { uid } from 'uid';
import { FILE_DIR } from '../constants/constants.js';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, FILE_DIR);
  },
  filename: function (req, file, cb) {
    const [_, extension] = file.originalname.split('.');
    cb(null, `${uid()}.${extension}`);
  },
});

//multer upload middleware
export const upload = multer({
  storage,
  limits: { fileSize: 40000 },
});
