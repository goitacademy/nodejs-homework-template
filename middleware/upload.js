import multer from 'multer';
import path from 'path';

// ########################################

const destination = path.resolve('temp');

const storage = multer.diskStorage({
  destination,
  filename: (req, file, cb) => {
    const { originalname } = file;

    const uniquePrefix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;

    const filename = `${uniquePrefix}_${originalname}`;

    cb(null, filename);
  },
});

const limits = { fileSize: 1024 ** 2 * 5 }; // 5 Mb

const upload = multer({ storage, limits });

export default upload;
