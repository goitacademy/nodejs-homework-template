const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const FILE_DIR = path.resolve("./public");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, FILE_DIR);
  },
  filename: (req, file, cb) => {
    const [, extension] = file.originalname.split(".");
    cb(null, `${uuidv4()}.${extension}`);
  },
});

const avatarMiddleware = multer({ storage });

module.exports = { avatarMiddleware };
