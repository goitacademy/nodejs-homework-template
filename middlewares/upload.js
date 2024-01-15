import multer from 'multer';
import path from 'path';

import { HttpError } from '../helpers/index.js';

// ============================================================

const destination = path.resolve('tmp');

const storage = multer.diskStorage({
  destination,
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const limits = {
  fileSize: 1024 * 1024 * 2,
};

const fileFilter = (req, file, callback) => {
  const extention = file.originalname.split('.').pop();
  if (extention === 'exe') {
    callback(HttpError(400, '.exe not valid extention'));
  }
};

const upload = multer({
  storage,
  limits,
  // fileFilter,
});

export default upload;
