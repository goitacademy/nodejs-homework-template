const multer = require('multer');

const date = new Date();

const UPLOAD_DIR = path.join(process.cwd(), 'uploads', date.getFullYear().toString(), date.getMonth() + 1);

const upload = multer({
  storage: multer.diskStorage({
    destination: (_, __, callback) => {
      callback(null, UPLOAD_DIR);
    },
    filename: (_, file, callback) => {
      callback(file.originalname);
    },
  })
});

const uploadFile = (req, res, next) => {
  
}

// module.exports