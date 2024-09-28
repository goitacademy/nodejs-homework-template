const multer = require("multer");
const path = require("path");
const UPLOAD_DIR = path.join(process.cwd(), "tmp");

const storage = multer.diskStorage({
  destination: UPLOAD_DIR,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

module.exports = upload;
