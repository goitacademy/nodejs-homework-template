const multer = require("multer");
const path = require("path");
const { createFolderIsNotExist } = require("../helpers/helpers");

const TMP_DIR = path.join(process.cwd(), "tmp");

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    createFolderIsNotExist(TMP_DIR);
    cb(null, TMP_DIR);
  },
  filename: (req, file, cb) => {
    const [fileName, extension] = file.originalname.split(".");
    cb(null, `${fileName}.${extension}`);
  },
  limits: {
    fileSize: 1048576,
  },
});

const fileMiddleware = multer({ storage });

module.exports = {
  fileMiddleware,
};
