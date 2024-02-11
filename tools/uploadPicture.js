const path = require("path");
const multer = require("multer");
const uploadDir = path.join(process.cwd(), "tmp");

const uploadPicture = (key) => {
  const storage = multer.diskStorage({
    destination: (_, __, cb) => {
      cb(null, uploadDir);
    },
    filename: (_, file, cb) => {
      cb(null, file.originalname);
    },
    limits: {
      fileSize: 1048576,
    },
  });

  const upload = multer({
    storage: storage,
  });

  return upload.single(key);
};

module.exports = uploadPicture;
