import multer from 'multer'

const UPLOAD_DIR = process.env.UPLOAD_DIR;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now().toString()
      cb(null, `${uniqueSuffix}_${file.originalname}`)
  }
});

export const upload = multer({
  storage: storage,
  limits: { fileSize: 100000 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes('image')) {
      return cb(null, true)
    }
    cb(new Error('Wrong format file!'))
  },
});
