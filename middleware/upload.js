const multer = require("multer");
const path = require("path");

const uploadDir = path.join(process.cwd(), "tmp");

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

module.exports = upload;
