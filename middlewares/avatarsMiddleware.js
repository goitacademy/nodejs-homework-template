const multer = require("multer");
const path = require("path");

const tmpDir = path.resolve("tmp");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tmpDir);
  },
  filename: (req, file, cb) => {
    const { originalname } = file;
    const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileName = `${uniquePrefix}-${originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({
  storage: storage,
});

module.exports = {
  upload,
};
