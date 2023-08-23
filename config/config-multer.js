import multer from 'multer';

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const storage = multer.diskStorage({
  destination: 'tmp',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now();
    const originalExtension = file.originalname.split('.').pop();
    cb(null, uniqueSuffix + '.' + originalExtension);
  },
});

export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});
